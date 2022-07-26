import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import EditPhotosService from 'services/editListings/photos'
import EditListingContainer from '../EditListingContainer'

const EditListingPhotos = () => {
  const galleryImgs = [
    'https://images.unsplash.com/photo-1614350391736-ed8619d63c06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80',
    'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
    'https://images.unsplash.com/photo-1609511092555-146f603e91b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1517988368819-88f4eacfef44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  ]
  const { yachtId } = useParams<{ yachtId?: string }>()

  const handleUpload = (file: File) => {
    if (yachtId) {
      const formData = new FormData()
      if (file) formData.append('image', file)

      toast.promise(
        EditPhotosService.uploadPhoto({ yachtId, image: formData }),
        {
          success: response => response.data.msg,
          loading: 'Uploading...',
          error: error => error.response.data.image,
        },
      )
    }
  }

  return (
    <EditListingContainer>
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Your Yatch Photos</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-8">
          <div>
            <span className="text-lg font-semibold">Pictures of the boat</span>
            <p className="text-sm mt-3">
              For the cover, choose a photo that shows the whole boat. Then add
              more photos of the details and the interior.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            {galleryImgs.map((image, index) => (
              <div
                key={index}
                className="relative w-full rounded-2xl overflow-hidden"
              >
                <img
                  className="object-contain h-full w-full scale-150"
                  src={image}
                  alt=""
                />
              </div>
            ))}
            {/* {file !== null && (
              <div className="relative w-full rounded-2xl overflow-hidden">
                <img
                  className="object-contain h-full w-full scale-150"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer"></div>
              </div>
            )} */}
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex-col text-sm text-neutral-6000 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload-2"
                    className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload-2"
                      name="file-upload-2"
                      type="file"
                      className="sr-only"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e?.target?.files?.length)
                          handleUpload(e.target.files[0])
                      }}
                    />
                  </label>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditListingContainer>
  )
}

export default EditListingPhotos
