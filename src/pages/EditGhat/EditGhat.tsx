import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import Textarea from 'components/shared/Textarea'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import GhatService from 'services/ghats'

const EditGhat = () => {
  const { ghatId } = useParams<{ ghatId: string }>()

  const { data: ghat } = useQuery('getGhatId', async () => {
    const { data } = await GhatService.getGhatId(ghatId)
    return data
  })

  const [title, setTitle] = useState(ghat?.title)
  const [description, setDescription] = useState(ghat?.description || '')
  const [picture, setPicture] = useState(ghat?.picture || '')
  const [file, setFile] = useState<File | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()

  useEffect(() => {
    setTitle(ghat?.title || '')
    setDescription(ghat?.description || '')
    setPicture(ghat?.picture || '')
  }, [ghat])

  const handleUpdateData = async (e: FormEvent) => {
    e.preventDefault()
    if (!title) return
    setIsDisabled(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (file) formData.append('picture', file)

    toast
      .promise(GhatService.updateGhatInfo(formData, ghat?._id), {
        loading: 'Updating...',
        success: 'updated',
        error: 'Error updating info',
      })
      .then(() => queryClient.invalidateQueries('getGhats'))
      .finally(() => {
        setIsDisabled(false)
      })
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <form
          className="grid grid-cols-1 gap-6"
          action="#"
          method="put"
          onSubmit={handleUpdateData}
        >
          <div className="flex items-center justify-between">
            <div>
              <Label>Title</Label>
              <InputWithHelper
                className="mt-1.5"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />

              <Label>Description</Label>
              <Textarea
                className="mt-1.5"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
            <div>
              <ImageUpload
                file={file}
                title={ghat?.title}
                setFile={setFile}
                imgUrl={picture}
              />
            </div>
          </div>
          <ButtonPrimary type="submit" disabled={isDisabled}>
            Update info
          </ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default EditGhat
