import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import ImageUpload from 'components/shared/ImageUpload'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import LocationMarker from 'components/shared/LocationMarker'
import Textarea from 'components/shared/Textarea'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import GhatService from 'services/ghats'
import GoogleMapReact from 'google-map-react'

const GhatForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [lat, setLat] = useState(25.3425829)
  const [lng, setLng] = useState(82.9702298)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', JSON.stringify({ lat, lng }))
    if (file) formData.append('picture', file)
    setIsDisabled(true)

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
        setFile(null)
      })
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
                file={file}
                // title={ghat?.title}
                setFile={setFile}
              />
            </div>
          </div>
          <div className="listingSection__wrap">
            <Label>Location</Label>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div className="aspect-w-5 aspect-h-3 sm:aspect-h-3">
              <div className="rounded-xl overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY',
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultZoom={15}
                  defaultCenter={{
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
          <ButtonPrimary disabled={isDisabled}>Save</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default GhatForm
