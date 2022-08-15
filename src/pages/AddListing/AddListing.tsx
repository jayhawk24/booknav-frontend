import React, { FC, useEffect, useState } from 'react'
import FormItem from 'components/shared/FormItem'
import Input from 'components/shared/Input/Input'
import Select from 'components/shared/Select/Select'
import Textarea from 'components/shared/Textarea'
import ImageUpload from 'components/shared/ImageUpload'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import AddBoatService from 'services/addBoat'
import toast from 'react-hot-toast'
import useGhats from 'hooks/useGhats'
import useBoatTypes from 'hooks/useBoatTypes'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { editNaav, getNaav } from 'services/naav'
import GallerySlider from 'components/GallerySlider'

type Props = {
  isEdit?: boolean
}

const AddListing: FC<Props> = ({ isEdit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [boatType, setBoatType] = useState('')
  const [ghat, setGhat] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [disabled, setDisabled] = useState(false)

  const { naavId } = useParams<{ naavId: string }>()
  const { data: ghats } = useGhats()
  const { data: boatTypes } = useBoatTypes()
  const { data: naav } = useQuery(['naav', naavId], () => {
    if (naavId) return getNaav(naavId)
  })
  const queryClient = useQueryClient()
  const history = useHistory()

  useEffect(() => {
    if (isEdit && naavId) {
      setTitle(naav?.title || '')
      setDescription(naav?.description || '')
      setBoatType(naav?.boatType?._id || '')
      setGhat(naav?.ghat?._id || '')
      setPrice(naav?.price || null)
    }
  }, [naav])
  useEffect(() => {
    if (ghats && boatTypes) {
      setGhat(ghats[0]._id)
      setBoatType(boatTypes[0]._id)
    }
  }, [ghats, boatTypes])

  const handleSumbit = () => {
    setDisabled(true)
    const formData = new FormData()
    console.log({ boatType, ghat })
    formData.append('title', title)
    formData.append('description', description)
    formData.append('boatType', boatType)
    formData.append('ghat', ghat)
    formData.append('price', price?.toString() || '')
    if (file) formData.append('picture', file)

    if (isEdit) {
      toast
        .promise(editNaav({ naavId, data: formData }), {
          loading: 'Updating naav...',
          success: 'Naav updated successfully',
          error: error => error.message,
        })
        .then(() => queryClient.invalidateQueries('naav'))
        .finally(() => setDisabled(false))
    } else {
      toast
        .promise(AddBoatService.addBoat(formData), {
          loading: 'Adding...',
          success: 'Naav added successfully',
          error: error => error.response.data.message,
        })
        .then(() => {
          queryClient.invalidateQueries('naav')
          history.push('/naavs')
        })
        .finally(() => setDisabled(false))
    }
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5">
        <div className="relative ">
          <GallerySlider
            uniqueID={`stay-v-${naavId}`}
            galleryImgs={naav?.pictures || []}
          />
        </div>
        <div className="grid grid-cols-2 items-center">
          <div>
            <ImageUpload file={file} setFile={setFile} title="Add Image" />
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
            <option disabled defaultChecked>
              Select naav type
            </option>
            {boatTypes?.map(boatType => (
              <option key={boatType._id} value={boatType._id}>
                {boatType.title}
              </option>
            ))}
          </Select>
        </FormItem>

        <FormItem label="Ghat">
          <Select value={ghat} onChange={e => setGhat(e.target.value)}>
            <option disabled>Select ghat</option>
            {ghats?.map(ghat => (
              <option key={ghat._id} value={ghat._id}>
                {ghat.title}
              </option>
            ))}
          </Select>
        </FormItem>

        <FormItem label="Price INR">
          <Input
            type="number"
            placeholder="Enter Price"
            value={price?.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(parseInt(e.target.value))
            }
          />
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
