import React, { FC, FormEvent, Fragment, useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import LocationMarker from 'components/shared/LocationMarker'
import CommentListing from 'components/CommentListing'
import FiveStartIconForRate from 'components/FiveStarIconForRate'
import StarRating from 'components/StarRating'
import GoogleMapReact from 'google-map-react'
import Avatar from 'components/shared/Avatar/Avatar'
import Badge from 'components/shared/Badge/Badge'
import ButtonCircle from 'components/shared/Buttons/ButtonCircle'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import Input from 'components/shared/Input/Input'
import NcImage from 'components/shared/NcImage/NcImage'
import LikeSaveBtns from './LikeSaveBtns'
import ModalPhotos from 'components/shared/ModalPhotos'
import BackgroundSection from 'components/BackgroundSection/BackgroundSection'
import SectionSliderNewCategories from 'components/SectionSliderNewCategories/SectionSliderNewCategories'
import MobileFooterSticky from './MobileFooterSticky'
import { useParams } from 'react-router-dom'
import useNaav from 'hooks/useNaav'
import averageRating from 'utils/averageRating'
import AvailableDates from 'components/AvailableDates'
import useBoatTypes from 'hooks/useBoatTypes'
import toast from 'react-hot-toast'
import { reviewNaav } from 'services/naav'
import useUser from 'hooks/useUser'
import { useQueryClient } from 'react-query'

export interface ListingStayDetailPageProps {
  className?: string
  defaultPoint?: number
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({
  className = '',
  defaultPoint = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openFocusIndex, setOpenFocusIndex] = useState(0)

  const [comment, setComment] = useState('')
  const { naavId } = useParams<{ naavId: string }>()
  const { data: naav } = useNaav({ naavId })
  const { data: boatTypes } = useBoatTypes()
  const [point, setPoint] = useState(defaultPoint)
  const { data: user } = useUser()
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()

  const isNaavik = user?.role === 'naavik'

  const handleOpenModal = (index: number) => {
    setIsOpen(true)
    setOpenFocusIndex(index)
  }

  const handleCloseModal = () => setIsOpen(false)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const data = { comment: comment, rating: point }
    setIsDisabled(true)

    toast
      .promise(reviewNaav(data, naavId), {
        loading: 'Adding review.',
        success: 'Review added.',
        error: error => error.response.data.message,
      })
      .then(() => {
        setComment('')
        setPoint(defaultPoint)
        queryClient.invalidateQueries('getNaav')
      })
      .finally(() => {
        setIsDisabled(false)
      })
  }

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap space-y-6">
        <div className="flex justify-between items-center">
          <Badge name={naav?.boatType?.title || ''} />
          <LikeSaveBtns />
        </div>

        <div className="flex justify-between">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {naav?.title}
          </h2>
          {!isNaavik && <MobileFooterSticky buttonOnly />}
        </div>

        <div className="flex items-center space-x-4">
          <StarRating
            reviewCount={naav?.reviews?.length}
            point={averageRating(naav?.reviews)}
          />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{naav?.ghat?.title}</span>
          </span>
        </div>
        <div className="flex items-center">
          <Avatar
            hasChecked
            sizeClass="h-10 w-10"
            radius="rounded-full"
            userName={naav?.user?.title}
            imgUrl={naav?.user?.picture}
          />
          <div className="flex justify-between w-full">
            <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
              Hosted by
              <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                {' '}
                {naav?.user?.title}
              </span>
            </span>
            <div className="flex items-center space-x-3 ">
              <i className=" las la-user text-2xl "></i>
              <span className="">
                6 <span className="hidden sm:inline-block">guests</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Naav Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{naav?.description}</span>
        </div>
      </div>
    )
  }
  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Trip Rates</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Ghat to Ghat</span>
              <span className="font-medium">₹ {naav?.price?.ghatToGhat} </span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Cross River</span>
              <span>
                <span className="font-medium">
                  ₹ {naav?.price?.crossRiver}{' '}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="listingSection__wrap__DayPickerRangeController flow-root">
          <div className="-mx-4 sm:mx-auto xl:mx-[-22px]">
            <AvailableDates />
          </div>
        </div>
      </div>
    )
  }
  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">
          Reviews ({naav?.reviews?.length} reviews)
        </h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        {user?.role === 'user' && (
          <div className="space-y-5">
            <FiveStartIconForRate
              iconClass="w-6 h-6"
              className="space-x-0.5"
              point={point}
              setPoint={setPoint}
              defaultPoint={defaultPoint}
            />
            <div className="relative">
              <Input
                fontClass=""
                sizeClass="h-16 px-4 py-3"
                rounded="rounded-3xl"
                placeholder="Share your thoughts ..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <ButtonCircle
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size=" w-12 h-12 "
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                <ArrowRightIcon className="w-5 h-5" />
              </ButtonCircle>
            </div>
          </div>
        )}

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {naav?.reviews
            ?.filter((_item, index) => index < 3)
            .map(item => (
              <CommentListing className="py-8" key={item._id} review={item} />
            ))}
          {naav?.reviews && naav?.reviews?.length > 3 && (
            <div className="pt-8">
              <ButtonSecondary>
                View more {naav?.reviews?.length - 3} reviews
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {naav?.ghat?.title}, Varanasi, Uttar Pradesh, India
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
          <ButtonSecondary>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${naav?.ghat?.location.lat},${naav?.ghat?.location.lng}`}
            >
              Open in Google Maps
            </a>
          </ButtonSecondary>
          <div className="rounded-xl overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_MAPS_API_KEY || '',
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultZoom={15}
              center={{
                lat: naav?.ghat?.location.lat || 25.3425829,
                lng: naav?.ghat?.location.lng || 82.9702298,
              }}
            >
              <LocationMarker
                lat={naav?.ghat?.location.lat || 25.3425829}
                lng={naav?.ghat?.location.lng || 82.9702298}
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    )
  }

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the booking
            within 24 hours after successful booking (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>Reach the specified ghat 30 minutes before start time.</li>
              <li>
                Please carry your ID proof and booking confirmation open on the
                app.
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`ListingDetailPage nc-ListingStayDetailPage ${className}`}
      data-nc-id="ListingStayDetailPage"
    >
      <>
        <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
          <div
            className={`relative grid ${
              naav?.pictures?.length !== 1 && 'grid-cols-3'
            } sm:grid-cols-4 gap-1 sm:gap-2`}
          >
            <div
              className="col-span-2 row-span-3 h-72 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer min-h-full"
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName="absolute inset-0 "
                className="object-cover w-full h-full rounded-md sm:rounded-xl "
                src={naav?.pictures?.[0]}
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            {naav?.pictures
              ?.filter((_, i) => i >= 1 && i < 5)
              ?.map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden  ${
                    index >= 3 ? 'hidden sm:block' : ''
                  }`}
                >
                  <NcImage
                    containerClassName="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
                    className="object-cover w-full h-full rounded-md sm:rounded-xl "
                    src={item || ''}
                  />

                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => handleOpenModal(index + 1)}
                  />
                </div>
              ))}

            <div
              className="absolute  flex items-center justify-center -bottom-8 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={() => handleOpenModal(0)}
            >
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span className="ml-2 text-neutral-800 text-xs font-medium">
                Show all photos
              </span>
            </div>
          </div>
        </header>
        <ModalPhotos
          imgs={naav?.pictures || []}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
          // uniqueClassName="nc-ListingStayDetailPage-modalPhotos"
        />
      </>

      {/* MAIn */}
      <main className="container relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection4()}
          {renderSectionCheckIndate()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>
      </main>

      {!isNaavik && <MobileFooterSticky />}

      {!isNaavik && (
        <div className="container py-24 lg:py-32">
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewCategories
              heading="Explore by types of Naavs"
              categoryCardType="card5"
              itemPerRow={5}
              sliderStyle="style2"
              categories={boatTypes}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingStayDetailPage
