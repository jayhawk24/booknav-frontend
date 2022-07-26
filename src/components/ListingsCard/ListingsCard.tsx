import React, { FC } from 'react'
import GallerySlider from 'components/GallerySlider'
import { Link } from 'react-router-dom'
import SaleOffBadge from 'components/shared/SaleOffBadge'
import Badge from 'components/shared/Badge'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import Select from 'components/shared/Select/Select'
import { Yacht } from 'services/addBoat'

export interface StayCardProps {
  className?: string
  ratioClass?: string
  boat: Yacht
  size?: 'default' | 'small'
}

const ListingsCard: FC<StayCardProps> = ({
  size = 'default',
  className = '',
  boat,
  ratioClass,
}) => {
  const {
    id,
    name,
    is_professional,
    type,
    yacht_icon,
    chartered_with,
    length,
    harbour,
  } = boat

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`stay-v-${id}`}
          ratioClass={ratioClass}
          galleryImgs={[yacht_icon]}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" /> */}
        {chartered_with.id === '1' && (
          <SaleOffBadge className="absolute left-3 top-3" />
        )}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-4 space-y-4' : 'p-3 space-y-2'}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {type.name} · {length} m
          </span>
          <div className="flex items-center space-x-2">
            {is_professional && <Badge name="ADS" color="green" />}
            <h2
              className={` font-medium capitalize ${
                size === 'default' ? 'text-lg' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{name}</span>
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
            <span className="">
              {harbour.city.name} · {harbour.name}
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        {/* <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {price}
            200
            {` `}
            {size === 'default' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </span>
            )}
          </span>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div> */}
      </div>
    )
  }

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:shadow-xl overflow-hidden transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      <Link to="/">
        {renderSliderGallery()}
        {renderContent()}
      </Link>
      <div className="flex space-x-3 justify-center mb-3 pr-3 pl-3 flex-wrap ">
        <ButtonSecondary href={`/yacht/${id}/general`} className="font-thin">
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
        <ButtonSecondary href="/edit-calendar" className="font-thin">
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
          <span className="ml-1 text-sm ">Calendar</span>
        </ButtonSecondary>
        <Select sizeClass="h-13" className="w-64  md:mt-2 sm:mt-2 mt-2">
          <option value="">Active</option>
          <option value="">Inactive</option>
          <option>Snooze</option>
        </Select>
      </div>
    </div>
  )
}

export default ListingsCard
