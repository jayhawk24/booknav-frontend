import React, { FC, useState } from 'react'
import GallerySlider from 'components/GallerySlider'
import { Link } from 'react-router-dom'
import { Naav } from 'services/addBoat'
import { TrashIcon, UsersIcon } from '@heroicons/react/outline'
import Badge from 'components/shared/Badge'

export interface StayCardProps {
  className?: string
  ratioClass?: string
  boat: Naav
  size?: 'default' | 'small'
}

const NaavCard: FC<StayCardProps> = ({
  size = 'default',
  className = '',
  boat,
  ratioClass,
}) => {
  const { _id, boatType, ghat, title, pictures, price, capacity, isPublished } =
    boat

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
        <div className="flex space-x-3 justify-between mb-3 pr-3 pl-3 flex-wrap items-center "></div>
      </div>
    </div>
  )
}

export default NaavCard
