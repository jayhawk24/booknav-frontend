import React, { useState } from 'react'
import FormItem from 'components/shared/FormItem'
import Input from 'components/shared/Input/Input'
import Select from 'components/shared/Select/Select'
import Textarea from 'components/shared/Textarea'
import ImageUpload from 'components/shared/ImageUpload'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import AddBoatService from 'services/addBoat'
import toast from 'react-hot-toast'

const AddListing = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [boatType, setBoatType] = useState('')
  const [ghat, setGhat] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [disabled, setDisabled] = useState(false)

  const handleSumbit = () => {
    setDisabled(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('boatType', boatType)
    formData.append('ghat', ghat)
    if (file) formData.append('file', file)

    toast
      .promise(AddBoatService.addBoat(formData), {
        loading: 'Adding...',
        success: response => response.data.message,
        error: error => error.response.data.message,
      })
      .finally(() => setDisabled(false))
  }
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5">
        <div className="grid grid-cols-2 items-center">
          <div>
            <ImageUpload
              setFile={setFile}
              title="Upload Image"
              sizeClass={'w-24 h-24'}
            />
          </div>
          <div className="-ml-10">
            <FormItem label="Title">
              <Input
                placeholder="Enter Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
            </FormItem>
            <FormItem label="Description">
              <Textarea
                placeholder="Enter Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormItem>
          </div>
        </div>

        <FormItem label="Naav Type">
          <Select value={boatType} onChange={e => setBoatType(e.target.value)}>
            <option>Hour</option>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </Select>
        </FormItem>

        <FormItem label="Ghat">
          <Select value={ghat} onChange={e => setGhat(e.target.value)}>
            <option>Hour</option>
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </Select>
        </FormItem>
      </div>
      <ButtonPrimary
        className="w-full my-5"
        disabled={disabled}
        onClick={handleSumbit}
      >
        Submit
      </ButtonPrimary>
      <div className="border-b border-neutral-200 dark:border-neutral-700 w-14 m-auto mt-3 "></div>
    </div>
  )
}

export default AddListing
