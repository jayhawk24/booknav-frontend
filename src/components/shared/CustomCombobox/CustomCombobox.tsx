import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { CityType, HarbourType } from 'services/addBoat'
import NcModal from '../NcModal/NcModal'
import InputWithHelper from '../InputWithHelper'
import Label from '../Label'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import ButtonSecondary from '../Buttons/ButtonSecondary'

type Props = {
  data: CityType[] | undefined
  onAddOption: (name: string) => Promise<void>
  selectedItem: CityType | HarbourType
  setSelectedItem: (item: CityType | HarbourType) => void
  modalTitle?: string
}

export default function CustomCombobox({
  data,
  onAddOption,
  selectedItem,
  setSelectedItem,
  modalTitle = 'Add',
}: Props) {
  const [query, setQuery] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const filteredData =
    query === ''
      ? data
      : data?.filter(person =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  const handleAdd = () => {
    onAddOption(query).then(() => setShowModal(false))
  }

  const renderModal = () => (
    <div className="w-1/2 m-auto space-y-8">
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
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      {({ open }) => {
        if (!open) setTimeout(() => setShowButton(open), 200)
        else setShowButton(open)
        return (
          <>
            <div className="relative mt-1 ">
              <div className="relative w-full text-left bg-neutral-100 dark:bg-neutral-800 cursor-default overflow-hidden border-2 border-neutral-100 dark:border-neutral-700 rounded-2xl text-sm block ">
                <Combobox.Input
                  className="w-full border-none focus:ring-0 py-3 px-4 text-sm leading-5 bg-white dark:bg-neutral-900 "
                  displayValue={(city: CityType) => city.name || ''}
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
                  <div>
                    <Combobox.Options className="absolute w-full py-1 mt-9 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                      {filteredData?.length === 0 && query !== '' ? (
                        <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredData?.map(person => (
                          <Combobox.Option
                            key={person.id}
                            className={({ active }) =>
                              `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                active
                                  ? 'text-white bg-primary-700'
                                  : 'text-gray-900 dark:text-neutral-50'
                              }`
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {person.name}
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
                  </div>
                </Transition>
              )}
              <NcModal
                isOpenProp={showModal}
                modalTitle={modalTitle}
                onCloseModal={() => setShowModal(false)}
                renderTrigger={() => (
                  <div
                    onClick={() => {
                      setShowModal(true)
                    }}
                    className={
                      showButton
                        ? 'cursor-pointer text-sm select-none py-2 pl-10 pr-4 absolute left-0 z-20 dark:bg-neutral-800 w-full rounded-lg border dark:border-0 bg-white'
                        : 'hidden'
                    }
                  >
                    {modalTitle} &quot;{query}&quot;
                  </div>
                )}
                renderContent={renderModal}
              />
            </div>
          </>
        )
      }}
    </Combobox>
  )
}
