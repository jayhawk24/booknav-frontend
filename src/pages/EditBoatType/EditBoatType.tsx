import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import BoatTypeService from 'services/boatType'

const AddBoatType = () => {
  const { boatTypeId } = useParams<{ boatTypeId: string }>()

  const { data: boatType } = useQuery('getGhatId', async () => {
    const { data } = await BoatTypeService.getBoatTypeId(boatTypeId)
    return data
  })

  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    setTitle(boatType?.title || '')
  }, [boatType])

  const handleUpdate = () => {
    setIsDisabled(true)

    toast
      .promise(BoatTypeService.updateBoatType(boatType?._id, title), {
        loading: 'Updating...',
        success: 'updated',
        error: 'Error updating info',
      })
      .then(() => queryClient.invalidateQueries('getBoatTypes'))
      .finally(() => {
        setIsDisabled(false)
      })
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <div>
          <Label>Title</Label>
          <InputWithHelper
            className="mt-1.5"
            placeholder="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <ButtonPrimary
          className="w-full mt-4"
          disabled={isDisabled}
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default AddBoatType
