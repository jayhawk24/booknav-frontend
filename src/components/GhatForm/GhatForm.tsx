import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import LocationMarker from 'components/shared/LocationMarker'
import Textarea from 'components/shared/Textarea'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import GhatService from 'services/ghats'
import GoogleMapReact from 'google-map-react'
import { useQuery, useQueryClient } from 'react-query'

type GhatFormProp = {
  ghatId?: string
}

const GhatForm: React.FC<GhatFormProp> = ({ ghatId }) => {
  const { data: ghat } = useQuery('getGhatId', async () => {
    const { data } = await GhatService.getGhatId(ghatId || '')
    return data
  })
  const [title, setTitle] = useState(ghat?.title || '')
  const [description, setDescription] = useState(ghat?.description || '')
  const [picture, setPicture] = useState(ghat?.picture || '')
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lat, setLat] = useState(ghat?.location?.lat || 25.3425829)
  const [lng, setLng] = useState(ghat?.location?.lng || 82.9702298)

  const queryClient = useQueryClient()

  useEffect(() => {
    setTitle(ghat?.title || '')
    setDescription(ghat?.description || '')
    setPicture(ghat?.picture || '')
    setLat(ghat?.location?.lat || 25.3425829)
    setLng(ghat?.location?.lng || 82.9702298)
  }, [ghat])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', JSON.stringify({ lat, lng }))
    if (file) formData.append('picture', file)
    setIsLoading(true)

    if (!title) {
      toast
        .promise(GhatService.addGhat(formData), {
          loading: 'Adding Ghat',
          success: 'Ghat added successfully.',
          error: 'Error adding, please try again',
        })
        .then(() => {
          setDescription('')
          setTitle('')
          setFile(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      toast
        .promise(GhatService.updateGhatInfo(formData, ghat?._id), {
          loading: 'Updating...',
          success: 'updated',
          error: 'Error updating info',
        })
        .then(() => queryClient.invalidateQueries('getGhats'))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <form
          className="grid grid-cols-1 gap-6"
          action="#"
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
              <ImageUpload file={file} setFile={setFile} imgUrl={picture} />
            </div>
          </div>
          <div className="listingSection__wrap">
            <Label>Location</Label>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div className="aspect-w-5 aspect-h-3 sm:aspect-h-3">
              <div className="rounded-xl overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAPS_API_KEY || '',
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultZoom={15}
                  center={{
                    lat: lat,
                    lng: lng,
                  }}
                  onClick={ev => {
                    setLat(ev.lat)
                    setLng(ev.lng)
                  }}
                >
                  <LocationMarker lat={lat} lng={lng} />
                </GoogleMapReact>
              </div>
            </div>
          </div>
          <ButtonPrimary loading={isLoading}>Save</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default GhatForm
