import React, { FC, useEffect, useState } from 'react'
import FormItem from 'components/shared/FormItem'
import Input from 'components/shared/Input/Input'
import Select from 'components/shared/Select/Select'
import Textarea from 'components/shared/Textarea'
import ImageUpload from 'components/shared/ImageUpload'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import AddBoatService, { Price } from 'services/addBoat'
import toast from 'react-hot-toast'
import useGhats from 'hooks/useGhats'
import useBoatTypes from 'hooks/useBoatTypes'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import {
  addUnavailability,
  deleteNaavImage,
  deleteUnavailability,
  editNaav,
  getUnavailability,
} from 'services/naav'
import GallerySlider from 'components/GallerySlider'
import useNaav from 'hooks/useNaav'
import { Loader } from 'components/FallbackComponent/FallbackComponent'
import DatesRangeInput from 'components/DatesRangeInput'
import { DateRange } from 'components/DatesRangeInput/DatesRangeInput'
import AvailableDates from 'components/AvailableDates'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import NcModal from 'components/shared/NcModal/NcModal'
import moment from 'moment'
import { useUnavailableDates } from 'hooks/useUnavailableDates'

type Props = {
  isEdit?: boolean
}

const AddListing: FC<Props> = ({ isEdit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [boatType, setBoatType] = useState('')
  const [ghat, setGhat] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [price, setPrice] = useState<Price | null>(null)
  const [capacity, setCapacity] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  const [disabled, setDisabled] = useState(false)
  const [unavailableDates, setUnavailableDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  })

  const { naavId } = useParams<{ naavId: string }>()
  const { data: ghats, isLoading } = useGhats()
  const { data: boatTypes, isLoading: isLoading2 } = useBoatTypes()
  const { data: naav, isLoading: isLoading3 } = useNaav({ naavId })
  const { data: unavailability } = useQuery(['unavailability', naavId], () =>
    getUnavailability(naavId),
  )
  const disabledDates = useUnavailableDates(unavailability || [])

  const queryClient = useQueryClient()
  const history = useHistory()

  useEffect(() => {
    if (isEdit && naavId) {
      console.log(naav)
      setTitle(naav?.title || '')
      setDescription(naav?.description || '')
      setBoatType(naav?.boatType?._id || '')
      setGhat(naav?.ghat?._id || '')
      setPrice(naav?.price || null)
      setCapacity(naav?.capacity || null)
      setStartTime(naav?.startTime || null)
      setEndTime(naav?.endTime || null)
    }
  }, [naav])

  useEffect(() => {
    if (ghats && boatTypes) {
      setGhat(ghats[0]._id)
      setBoatType(boatTypes[0]._id)
    }
  }, [ghats, boatTypes])

  const handleSumbit = () => {
    if (!validateTime(startTime || '') || !validateTime(endTime || '')) {
      toast.error('Invalid time')
      return
    }

    setDisabled(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('boatType', boatType)
    formData.append('ghat', ghat)
    formData.append('price', JSON.stringify(price) || '')
    formData.append('capacity', capacity?.toString() || '')
    formData.append('startTime', startTime?.toString() || '')
    formData.append('endTime', endTime?.toString() || '')
    if (file) formData.append('picture', file)

    if (isEdit) {
      toast
        .promise(editNaav({ naavId, data: formData }), {
          loading: 'Updating naav...',
          success: 'Naav updated successfully',
          error: error => error.response.data.message,
        })
        .then(() => {
          queryClient.invalidateQueries(['getNaav', naavId])
          setFile(null)
        })
        .finally(() => setDisabled(false))
    } else {
      toast
        .promise(AddBoatService.addBoat(formData), {
          loading: 'Adding...',
          success: 'Naav added successfully',
          error: error => error.response.data.message,
        })
        .then(() => {
          setFile(null)
          queryClient.invalidateQueries(['getNaav', naavId])
          history.push('/naavs')
        })
        .finally(() => setDisabled(false))
    }
  }

  const handleDelete = async (imageId: string) => {
    return toast
      .promise(deleteNaavImage({ naavId, imageId }), {
        loading: 'Deleting image...',
        success: 'Image deleted successfully.',
        error: error => error.response.data.message,
      })
      .then(() => queryClient.invalidateQueries(['getNaav', naavId]))
  }

  const handleUnavailability = () => {
    if (!unavailableDates.startDate || !unavailableDates.endDate) return

    setDisabled(true)
    toast
      .promise(
        addUnavailability({
          naavId,
          startDate: unavailableDates.startDate?.format() || '',
          endDate: unavailableDates.endDate?.format() || '',
        }),
        {
          loading: 'Adding unavailability...',
          success: 'Unavailability added successfully.',
          error: error => error.response.data.message,
        },
      )
      .then(() => {
        queryClient.invalidateQueries(['unavailability', naavId])
        setUnavailableDates({ startDate: null, endDate: null })
      })
      .finally(() => setDisabled(false))
  }

  const handleDeleteUnavailability = (unavailabilityId: string) => {
    setDisabled(true)
    toast
      .promise(deleteUnavailability({ naavId, unavailabilityId }), {
        loading: 'Deleting unavailability...',
        success: 'Unavailability deleted successfully.',
        error: error => error.response.data.message,
      })
      .then(() => queryClient.invalidateQueries(['unavailability', naavId]))
      .finally(() => setDisabled(false))
  }

  const validateTime = (time: string) => {
    const regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
    return time.match(regex)
  }

  if (isLoading || isLoading2 || isLoading3)
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    )

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <div className="relative rounded-xl overflow-hidden">
          <GallerySlider
            uniqueID={`stay-v-${naavId}`}
            galleryImgs={naav?.pictures || []}
            handleDelete={handleDelete}
          />
        </div>
        <div className="grid grid-cols-3 items-center">
          <ImageUpload
            file={file}
            setFile={setFile}
            title="Add Image"
            sizeClass="h-24 w-24"
          />
          <div className="col-span-2">
            <FormItem label="Title" className="mb-2">
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
        <div className="grid grid-cols-2 gap-2 w-full">
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

          <FormItem label="Capacity">
            <Input
              type="number"
              min={1}
              max={500}
              placeholder="Authorized Capacity"
              value={capacity?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCapacity(parseInt(e.target.value))
              }
            />
          </FormItem>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <FormItem label="Start Time">
            <Input
              placeholder="Time"
              value={startTime?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartTime(e.target.value)
              }}
            />
          </FormItem>
          <FormItem label="End Time">
            <Input
              placeholder="Time"
              value={endTime?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEndTime(e.target.value)
              }}
            />
          </FormItem>
        </div>

        <h1 className="text-xl font-semibold mt-5">Pricing</h1>
        <div className="grid grid-cols-2 gap-2">
          <FormItem label="Ghat To Ghat">
            <Input
              type="number"
              min={0}
              max={99999}
              placeholder="Assi to Manikarnika"
              value={price?.ghatToGhat?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice({
                  ...price,
                  ghatToGhat: parseInt(e.target.value),
                })
              }
            />
          </FormItem>
          <FormItem label="Cross River">
            <Input
              type="number"
              min={0}
              max={99999}
              placeholder="Ghat to Beach"
              value={price?.crossRiver?.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice({
                  ...price,
                  crossRiver: parseInt(e.target.value),
                })
              }
            />
          </FormItem>
        </div>
        <ButtonPrimary
          className="w-full my-5"
          loading={disabled}
          onClick={handleSumbit}
        >
          Submit
        </ButtonPrimary>
        <h1 className="text-xl font-semibold mt-5">Unavailability</h1>
        <p className="text-xs text-neutral-700">
          Select dates when this naav is not available
        </p>
        <div className="grid grid-cols-3 grid-rows-1">
          <div className="col-span-2">
            <DatesRangeInput
              onChange={setUnavailableDates}
              defaultValue={unavailableDates}
              numberOfMonths={1}
              disableDates={disabledDates}
            />
          </div>
          <div className="flex flex-col justify-center">
            <ButtonPrimary
              className="w-full my-5"
              loading={disabled}
              onClick={handleUnavailability}
            >
              Add
            </ButtonPrimary>
            {unavailability && unavailability.length > 0 && (
              <NcModal
                modalTitle="Delete Unavailability"
                renderContent={() => (
                  <div className="flex flex-col items-center">
                    {unavailability?.map(unavailability => (
                      <div
                        key={unavailability._id}
                        className="flex items-center justify-between w-full my-2"
                      >
                        <p className="text-sm text-neutral-700">
                          {moment(unavailability.startTime).format(
                            'DD MMM YYYY',
                          )}{' '}
                          -{' '}
                          {moment(unavailability.endTime).format('DD MMM YYYY')}
                        </p>
                        <ButtonPrimary
                          className="mr-2"
                          loading={disabled}
                          onClick={() =>
                            handleDeleteUnavailability(unavailability._id)
                          }
                        >
                          Delete
                        </ButtonPrimary>
                      </div>
                    ))}
                  </div>
                )}
                renderTrigger={openModal => (
                  <ButtonSecondary
                    onClick={() => openModal()}
                    className="w-full"
                  >
                    Remove
                  </ButtonSecondary>
                )}
              />
            )}
          </div>
        </div>
        <div className="flex items-center flex-col">
          <AvailableDates unavailability={unavailability} />
        </div>
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-700 w-14 m-auto mt-3 "></div>
    </div>
  )
}

export default AddListing
