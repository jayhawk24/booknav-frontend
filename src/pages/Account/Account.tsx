import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import Label from 'components/shared/Label/Label'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import useUser from 'hooks/useUser'
import toast from 'react-hot-toast'
import accountService from 'services/account'
import InputWithHelper from 'components/shared/InputWithHelper'
import ImageUpload from 'components/shared/ImageUpload'
import BankForm from 'components/BankForm/BankForm'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import { TrashIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'
import NcModal from 'components/shared/NcModal/NcModal'

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

  const history = useHistory()

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

  const handleDelete = () => {
    setIsDisabled(true)
    toast
      .promise(accountService.deleteAccount(), {
        loading: 'Deleting...',
        success: response => response.data.message,
        error: 'Error deleting account',
      })
      .then(() => {
        history.push('/logout')
      })
      .finally(() => setIsDisabled(false))
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

              <div className="pt-2 pb-5 flex justify-between items-center ">
                <ButtonPrimary type="submit" loading={isDisabled}>
                  Update Info
                </ButtonPrimary>
                <NcModal
                  modalTitle={'Delete Bank'}
                  renderTrigger={openModal => (
                    <ButtonSecondary type="submit" onClick={() => openModal()}>
                      <TrashIcon className="h-6 w-5" />
                      Delete Account
                    </ButtonSecondary>
                  )}
                  renderContent={() => (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p className="text-center">
                        Are you sure you want to delete your account? This
                        action cannot be undone.
                      </p>
                      <div className="flex space-x-4">
                        <ButtonPrimary
                          type="submit"
                          loading={isDisabled}
                          onClick={() => handleDelete()}
                        >
                          Delete
                        </ButtonPrimary>
                        <ButtonSecondary
                          type="submit"
                          onClick={() => history.push('/account')}
                        >
                          No
                        </ButtonSecondary>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {user?.role === 'naavik' && (
        <div className="container mt-24 lg:mb-32" style={{ minHeight: '60vh' }}>
          <BankForm />
        </div>
      )}
    </div>
  )
}

export default Account
