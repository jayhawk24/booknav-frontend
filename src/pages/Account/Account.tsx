import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import Label from 'components/shared/Label/Label'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import useUser from 'hooks/useUser'
import toast from 'react-hot-toast'
import accountService from 'services/account'
import InputWithHelper from 'components/shared/InputWithHelper'
import ImageUpload from 'components/shared/ImageUpload'

export interface AccountPageProps {
  className?: string
}

const Account: FC<AccountPageProps> = ({ className = '' }) => {
  const { data: user } = useUser()
  const queryClient = useQueryClient()

  const [name, setName] = useState(user?.title || '')
  const [picture, setPicture] = useState(user?.picture || '')
  const [file, setFile] = useState<File | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState({
    name: '',
    country: '',
    city: '',
    picture: '',
  })

  useEffect(() => {
    setName(user?.title || '')
    setPicture(user?.picture || '')
  }, [user])

  const handleUpdateInfo = async (e: FormEvent) => {
    e.preventDefault()
    if (!name) return

    setIsDisabled(true)

    const formData = new FormData()
    formData.append('title', name)
    console.log(file)
    if (file) formData.append('picture', file)

    toast
      .promise(accountService.updateGeneralInfo(formData), {
        loading: 'Updating...',
        success: response => response.data.message,
        error: 'Error updating info',
      })
      .then(() => {
        queryClient.invalidateQueries('getUser')
        setIsDisabled(false)
      })
      .catch(error => {
        setIsDisabled(false)
        setError(error.response.data)
      })
  }

  return (
    <div
      className={`nc-AccountPage ${className} container`}
      data-nc-id="AccountPage"
    >
      <div className="space-y-6 sm:space-y-8">
        {/* HEADING */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <form onSubmit={handleUpdateInfo} encType="multipart/form-data">
          <div className="flex flex-col md:flex-row">
            <ImageUpload
              file={file}
              title={user?.title}
              setFile={setFile}
              imgUrl={picture}
            />
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Name</Label>
                {
                  <InputWithHelper
                    className="mt-1.5"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                    helperText={error.name}
                  />
                }
              </div>
              <div>
                <Label>Phone</Label>
                {
                  <InputWithHelper
                    className="mt-1.5"
                    value={user?.phone}
                    disabled
                  />
                }
              </div>

              <div className="pt-2 pb-5">
                <ButtonPrimary type="submit" disabled={isDisabled}>
                  Update info
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Account
