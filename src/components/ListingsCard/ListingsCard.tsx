import React, { FC, useState } from 'react'
import GallerySlider from 'components/GallerySlider'
import { Link } from 'react-router-dom'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import { Naav } from 'services/addBoat'
import { deleteNaav, publishNaav } from 'services/naav'
import { TrashIcon, UsersIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'
import Badge from 'components/shared/Badge'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import toast from 'react-hot-toast'

export interface StayCardProps {
  className?: string
  ratioClass?: string
  boat: Naav
  size?: 'default' | 'small'
}

const ListingsCard: FC<StayCardProps> = ({
  size = 'default',
  className = '',
  boat,
  ratioClass,
}) => {
  const { _id, boatType, ghat, title, pictures, price, capacity, isPublished } =
    boat
  const [publishHover, setPublishHover] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const queryClient = useQueryClient()

  const handlePublish = () => {
    setDisabled(true)
    toast
      .promise(publishNaav({ id: _id, isPublished: !isPublished }), {
        loading: 'Updating status',
        success: 'Status Updated',
        error: 'Failed to update status',
      })
      .then(() => queryClient.invalidateQueries('getListings'))
      .finally(() => setDisabled(false))
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`stay-v-${_id}`}
          ratioClass={ratioClass}
          galleryImgs={pictures || []}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
        {/* {chartered_with.id === '1' && (
          <SaleOffBadge className="absolute left-3 top-3" />
        )} */}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-4 space-y-4' : 'p-3 space-y-2'}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {title}
          </span>
          <div className="flex items-center space-x-2">
            {isPublished && <Badge name="LIVE" color="green" />}
            <h2
              className={` font-medium capitalize ${
                size === 'default' ? 'text-lg' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{boatType?.title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === 'default' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{ghat?.title}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ₹{price}
            {size === 'default' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /trip
              </span>
            )}
          </span>
          <span className="text-base font-semibold flex items-center space-x-2">
            <UsersIcon className="h-4 w-4 ml-2" />
            <span>{capacity}</span>
          </span>
          {/* {reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:shadow-xl overflow-hidden transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to="/">{renderContent()}</Link>
      <div className="flex justify-center mb-5">
        <ButtonSecondary href={`/naav/${_id}/edit/`} className="font-thin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="ml-3 text-sm">Edit</span>
        </ButtonSecondary>
        <ButtonSecondary
          onClick={() => {
            deleteNaav(_id).then(() =>
              queryClient.invalidateQueries('getListings'),
            )
          }}
          className="font-thin ml-5"
        >
          <TrashIcon className="h-5" />
          Delete
        </ButtonSecondary>
        <div className="flex space-x-3 justify-between mb-3 pr-3 pl-3 flex-wrap items-center ">
          <div
            className="w-full"
            onMouseEnter={() => setPublishHover(true)}
            onMouseLeave={() => setPublishHover(false)}
          >
            <ButtonPrimary
              className={
                isPublished
                  ? 'font-thin w-full dark:bg-neutral-800 bg-neutral-200 text-gray-600 hover:text-gray-50 dark:text-neutral-400 '
                  : 'font-thin w-full'
              }
              onClick={handlePublish}
              disabled={disabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-1 text-sm">
                {isPublished
                  ? publishHover
                    ? 'Unpublish'
                    : 'Published'
                  : 'Publish'}
              </span>
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingsCard
