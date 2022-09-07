import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import React, { FC, Fragment, useState } from 'react'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import { XIcon } from '@heroicons/react/solid'
import DateSingleInput from 'components/shared/DateSingleInput/DateSingleInput'

interface ModalSelectDateProps {
  onClose?: () => void
  defaultValue: moment.Moment | null
  renderChildren?: (p: {
    defaultValue: moment.Moment | null
    openModal: () => void
  }) => React.ReactNode
  dateFocused: boolean
  setDateFocused: (focused: boolean) => void
  dateValue: moment.Moment | null
  setDateValue: (date: moment.Moment | null) => void
}

const ModalSelectDate: FC<ModalSelectDateProps> = ({
  defaultValue,
  dateValue,
  setDateValue,
  dateFocused,
  setDateFocused,
  renderChildren,
}) => {
  const [showModal, setShowModal] = useState(false)
  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  //
  function closeModal() {
    setShowModal(false)
  }

  function openModal() {
    setShowModal(true)
  }

  const renderButtonOpenModal = () => {
    return renderChildren ? (
      renderChildren({ defaultValue, openModal })
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
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={closeModal}
                      >
                        <XIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>
                    <div className="pt-12 p-1 flex flex-col">
                      <div className="p-5 ">
                        <span className="block font-semibold text-xl sm:text-2xl">
                          When&apos;s your trip?
                        </span>
                      </div>
                      <DateSingleInput
                        defaultValue={dateValue}
                        onChange={(date: moment.Moment | null) =>
                          setDateValue(date)
                        }
                        defaultFocus={dateFocused}
                        onFocusChange={(focus: boolean) => {
                          setDateFocused(focus)
                        }}
                      />
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                      <button
                        type="button"
                        className="underline font-semibold flex-shrink-0"
                        onClick={() => setDateValue(moment().add(1, 'days'))}
                      >
                        Clear dates
                      </button>
                      <ButtonPrimary
                        sizeClass="px-6 py-3 !rounded-xl"
                        onClick={() => {
                          closeModal()
                        }}
                      >
                        Save
                      </ButtonPrimary>
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

export default ModalSelectDate
