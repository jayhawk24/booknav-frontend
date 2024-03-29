import React, { Fragment, ReactNode, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { GuestsObject } from 'components/GuestsInput/GuestsInput'
import moment, { Moment } from 'moment'
import CheckOutPage from 'pages/Checkout/Checkout'
import { Price } from 'services/addBoat'

type ModalReserveMobileProps = {
  onClose?: () => void
  onChangeGuests: (date: GuestsObject) => void
  renderChildren?: (p: { openModal: () => void }) => React.ReactNode
  onChangeDate: (date: moment.Moment) => void
  defaultGuests: GuestsObject
  defaultDate: moment.Moment | null
  renderModalSelectDate: (
    renderProp: (p: {
      defaultValue?: moment.Moment | null
      openModal: () => void
    }) => React.ReactNode,
  ) => JSX.Element
  time: number
  selectedPriceType?: keyof Price
}

const ModalReserveMobile = ({
  renderChildren,
  renderModalSelectDate,
  defaultDate,
  time,
  selectedPriceType,
}: ModalReserveMobileProps) => {
  const [showModal, setShowModal] = useState(false)

  function closeModal() {
    setShowModal(false)
  }

  function openModal() {
    setShowModal(true)
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    )
  }

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900">
                        <CheckOutPage
                          renderModalSelectDate={renderModalSelectDate}
                          date={defaultDate}
                          time={time}
                          selctedPriceType={selectedPriceType}
                        />
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalReserveMobile
