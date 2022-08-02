import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import Textarea from 'components/shared/Textarea'
import useGhats from 'hooks/useGhats'
import React, { FormEvent, useState } from 'react'

const AddGhatForm = () => {
  const { data: ghat } = useGhats()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState(ghat?.picture || '')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          <div>
            <Label>Title</Label>
            <InputWithHelper
              className="mt-1.5"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              className="mt-1.5"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <ImageUpload title={ghat?.title} setFile={setFile} imgUrl={picture} />
        </form>
      </div>
    </div>
  )
}

export default AddGhatForm
