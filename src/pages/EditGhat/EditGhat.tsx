import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import Textarea from 'components/shared/Textarea'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import GhatService from 'services/ghats'

const EditGhat = () => {
  const { ghatId } = useParams<{ ghatId: string }>()

  const { data } = useQuery('getGhatId', () => GhatService.getGhatId(ghatId))
  // console.log(data)
  const [title, setTitle] = useState(data?.title || '')
  const [description, setDescription] = useState(data?.description || '')
  // const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    setTitle(data?.title || '')
    setDescription(data?.description || '')
  }, [data])

  console.log(title)

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <form className="grid grid-cols-1 gap-6" action="#" method="put">
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
            {/* <div>
              <ImageUpload
                // title={ghat?.title}
                setFile={setFile}
              />
            </div> */}
          </div>
          <ButtonPrimary>Save</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default EditGhat
