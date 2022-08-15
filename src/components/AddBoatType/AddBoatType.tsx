import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import BoatTypeService from 'services/boatType'

const AddBoatType = () => {
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSave = (event: Event) => {
    event.preventDefault()
    setIsDisabled(true)
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
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
          </div>
        </div>
        <ButtonPrimary disabled={isDisabled} type="submit">
          Save
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default AddBoatType
