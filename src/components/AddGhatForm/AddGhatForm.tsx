import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import Textarea from 'components/shared/Textarea'
import useGhats from 'hooks/useGhats'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import GhatService from 'services/ghats'

const AddGhatForm = () => {
  const { data: ghat } = useGhats()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', JSON.stringify({ lat: 687416, lng: 87964 }))

    if (file) formData.append('picture', file)

    const addGhat = GhatService.addGhat(formData)

    toast
      .promise(addGhat, {
        loading: 'Adding Ghat',
        success: 'Ghat added successfully.',
        error: 'Error adding, please try again',
      })
      .then(() => {
        setDescription('')
        setTitle('')
      })
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <form
          className="grid grid-cols-1 gap-6"
          action="#"
          method="post"
          onSubmit={handleSubmit}
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
                // title={ghat?.title}
                setFile={setFile}
              />
            </div>
          </div>
          <ButtonPrimary>Save</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default AddGhatForm