import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {
  CityType,
  HarbourType,
  ManufacturerType,
  ModelType,
} from 'services/addBoat'
import NcModal from '../NcModal/NcModal'
import Label from '../Label'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import ButtonSecondary from '../Buttons/ButtonSecondary'
import InputWithHelper from '../InputWithHelper'
import shortenString from '../../../utils/shortenString'

type Props = {
  data:
    | CityType[]
    | ModelType[]
    | ManufacturerType[]
    | HarbourType[]
    | undefined
  onAddOption?: (query: string) => Promise<ManufacturerType | ModelType>
  selectedItem: CityType | HarbourType | ModelType | ManufacturerType
  setSelectedItem: (
    item: ManufacturerType | ModelType | HarbourType | CityType,
  ) => void
  modalTitle?: string
  isDisabled?: boolean
  disableAddButton?: boolean
}

export default function CustomCombobox({
  data,
  onAddOption,
  selectedItem,
  setSelectedItem,
  modalTitle = 'Add',
  isDisabled,
  disableAddButton = false,
}: Props) {
  const [query, setQuery] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showModal, setShowModal] = useState(false)

  const filteredData =
    query === ''
      ? data
      : data?.filter(item =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  const handleAdd = async () => {
    if (onAddOption) {
      onAddOption(query).then((response: ManufacturerType | ModelType) => {
        setSelectedItem(response)
        setShowModal(false)
      })
    }
  }

  const renderModal = () => (
    <div className="w-1/2 m-auto space-y-8 pt-5 pb-10">
      <Label>
        {modalTitle}
        <InputWithHelper
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Label>
      <div className="flex justify-between">
        <ButtonSecondary onClick={() => setShowModal(false)}>
          Close
        </ButtonSecondary>
        <ButtonPrimary onClick={handleAdd}>Save</ButtonPrimary>
      </div>
    </div>
  )

  return (
    <Combobox
      value={selectedItem}
      onChange={setSelectedItem}
      disabled={isDisabled}
    >
      {({ open }) => {
        if (!open && !showModal) setQuery('')
        return (
          <>
            <div className="relative mt-1 ">
              <div className="relative w-full text-left bg-neutral-100 dark:bg-neutral-800 cursor-default overflow-hidden border-2 border-neutral-100 dark:border-neutral-700 rounded-2xl text-sm block ">
                <Combobox.Input
                  className="w-full border-none focus:ring-0 py-3 px-4 text-sm leading-5 bg-white dark:bg-neutral-900 "
                  displayValue={(item: ManufacturerType | ModelType) =>
                    shortenString(item.name, 30) || ''
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>

              {open && (
                <Transition
                  as={Fragment}
                  leave="transition-opacity duration-250"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute w-full py-1 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {!disableAddButton && (
                      <Combobox.Option value="">
                        <div
                          onClick={() => setShowModal(true)}
                          className="cursor-pointer text-sm select-none py-2 pl-10 pr-4 dark:bg-neutral-800 w-full rounded-lg bg-white hover:bg-primary-700 hover:dark:bg-primary-700 hover:text-white "
                        >
                          {modalTitle} {query && `'${query}'`}
                        </div>
                      </Combobox.Option>
                    )}
                    {filteredData?.length === 0 && query !== '' ? (
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredData?.map(item => (
                        <Combobox.Option
                          key={item.id}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? 'text-white bg-primary-700'
                                : 'text-gray-900 dark:text-neutral-50'
                            }`
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {shortenString(item.name, 30)}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-primary-600'
                                  }`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              )}
            </div>
            <NcModal
              isOpenProp={showModal}
              modalTitle={modalTitle}
              onCloseModal={() => setShowModal(false)}
              renderTrigger={() => <></>}
              renderContent={renderModal}
            />
          </>
        )
      }}
    </Combobox>
  )
}
