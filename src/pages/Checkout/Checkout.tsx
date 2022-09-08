import { Popover, Tab, Transition } from '@headlessui/react'
import { ChevronDownIcon, PencilAltIcon } from '@heroicons/react/outline'
import React, { FC, Fragment, useState } from 'react'
import visaPng from 'images/vis.png'
import mastercardPng from 'images/mastercard.svg'
import Input from 'components/shared/Input/Input'
import Label from 'components/shared/Label'
import Textarea from 'components/shared/Textarea'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import NcImage from 'components/shared/NcImage'
import StartRating from 'components/StarRating/StarRating'
import NcModal from 'components/shared/NcModal/NcModal'
import ModalSelectDate from 'components/ModalSelectDate/ModalSelectDate'
import moment from 'moment'
import { GuestsObject } from 'components/GuestsInput/GuestsInput'
import GuestsInput from 'components/HeroSearchForm/GuestsInput'
import { useParams } from 'react-router-dom'
import useNaav from 'hooks/useNaav'
import averageRating from 'utils/averageRating'

export interface CheckOutPageProps {
  className?: string
}

const priceTypes = ['ghatToGhat', 'crossRiver', 'hourly']

const CheckOutPage: FC<CheckOutPageProps> = ({ className = '' }) => {
  const [rangeDates, setRangeDates] = useState<moment.Moment | null>(
    moment().add(1, 'days'),
  )
  const [dateFocused, setDateFocused] = useState(true)
  const [guests, setGuests] = useState<GuestsObject>({
    guestAdults: 2,
    guestChildren: 1,
    guestInfants: 1,
  })
  const [boatTypesState, setBoatTypesState] = useState('ghatToGhat')
  const { naavId } = useParams<{ naavId: string }>()
  const { data: naav } = useNaav({ naavId })

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <NcImage src={naav?.pictures?.[0]} />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {naav?.title}
              </span>
              <span className="text-base font-medium mt-1 block">
                {naav?.boatType?.title}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {naav?.ghat?.title} · {guests.guestAdults} guests
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating
              reviewCount={naav?.reviews?.length}
              point={averageRating(naav?.reviews)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>₹{naav?.price?.ghatToGhat} x 1 ride</span>
            <span>₹{naav?.price?.ghatToGhat}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>₹0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{naav?.price?.ghatToGhat}</span>
          </div>
        </div>
      </div>
    )
  }
  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={openModal => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <ModalSelectDate
              defaultValue={rangeDates}
              dateValue={rangeDates}
              setDateValue={setRangeDates}
              dateFocused={dateFocused}
              setDateFocused={setDateFocused}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 "
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {moment(rangeDates).format('MMM DD, YYYY')}
                    </span>
                  </div>
                  <PencilAltIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
            <GuestsInput
              className="nc-ListingStayDetailPage__guestsInput flex-1"
              defaultValue={guests}
              onChange={setGuests}
              hasButtonSubmit={false}
            />
          </div>

          <div className=" mr-2 my-1 sm:mr-4 border border-neutral-300 dark:border-neutral-700 rounded-full">
            <Popover className="relative">
              {({ open, close }) => (
                <>
                  <Popover.Button
                    className={`
           ${open ? '' : ''}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
                    onClick={() => document.querySelector('html')?.click()}
                  >
                    <span>{`${boatTypesState}`}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? '' : 'text-opacity-70'
                      } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-[200px] sm:max-w-[220px] px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 ">
                      <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                        <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                          {priceTypes?.map(item => (
                            <div
                              key={item}
                              onClick={e => {
                                e.preventDefault()
                                setBoatTypesState(item)
                                close()
                              }}
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <p className="text-sm font-medium ">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? 'bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900'
                          : 'text-neutral-6000 dark:text-neutral-400'
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? 'bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900'
                          : ' text-neutral-6000 dark:text-neutral-400'
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <img className="w-8" src={visaPng} alt="" />
                      <img className="w-8" src={mastercardPng} alt="" />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={'/pay-done'}>Confirm and pay</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default CheckOutPage
