import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import FormItem from 'components/shared/FormItem'
import Input from 'components/shared/Input/Input'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import DescriptionService from 'services/editListings/description'
import EditListingContainer from '../EditListingContainer'

const EditListingDescription = () => {
  const [cabins, setCabins] = useState('')
  const [berths, setBerths] = useState('')
  const [authorisedCapacity, setAuthorisedCapacity] = useState('')
  const [recommendedCapacity, setRecommendedCapacity] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [speed, setSpeed] = useState('')
  const [renovated, setRenovated] = useState('')
  const [fuel, setFuel] = useState('')
  const [yearOfConstruction, setYearOfConstruction] = useState('')
  const [length, setLength] = useState('')

  const [disabled, setDisabled] = useState(false)

  const { yachtId } = useParams<{ yachtId: string }>()

  const handleSubmit = () => {
    setDisabled(true)

    toast
      .promise(
        DescriptionService.updateDescription({
          yachtId,
          data: {
            cabins: parseFloat(cabins),
            berths: parseFloat(berths),
            authorised_capacity: parseFloat(authorisedCapacity),
            recommended_capacity: parseFloat(recommendedCapacity),
            bathrooms: parseFloat(bathrooms),
            speed: parseFloat(speed),
            renovated: parseFloat(renovated),
            fuel: parseFloat(fuel),
            year_of_construction: parseFloat(yearOfConstruction),
            length: parseFloat(length),
          },
        }),
        {
          loading: 'Updating ...',
          success: response => response.data.message,
          error: error => error.response.data.message,
        },
      )
      .finally(() => setDisabled(false))
  }
  return (
    <EditListingContainer>
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Boat Technical Details</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* <FormItem label="Name">
          <Input defaultValue="The Catamaran Superyacht" />
        </FormItem> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 space-y-3">
          <FormItem label="Number of cabins" className="mt-3">
            <Input
              type="number"
              value={cabins}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCabins(e.target.value)
              }
            />
          </FormItem>
          <FormItem label="Number of berths">
            <Input
              type="number"
              value={berths}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBerths(e.target.value)
              }
            />
          </FormItem>
          <FormItem label="Onboard capacity - Authorised">
            <Input
              type="number"
              value={authorisedCapacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAuthorisedCapacity(e.target.value)
              }
            />
          </FormItem>
          <FormItem
            label="
                    Onboard capacity - Recommended "
          >
            <Input
              type="number"
              value={recommendedCapacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRecommendedCapacity(e.target.value)
              }
            />
          </FormItem>

          <FormItem
            label="
                    Number of bathrooms"
          >
            <Input
              type="number"
              value={bathrooms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBathrooms(e.target.value)
              }
            />
          </FormItem>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-5 space-y-5">
          <div className="flex-col space-y-3">
            <FormItem label="Speed">
              <Input
                type="number"
                value={speed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSpeed(e.target.value)
                }
              />
            </FormItem>
            <FormItem label="Fuel">
              <Input
                type="number"
                value={fuel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFuel(e.target.value)
                }
              />
            </FormItem>
            <FormItem label="Length ">
              <Input
                type="number"
                value={length}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLength(e.target.value)
                }
              />
            </FormItem>
          </div>
          <div className="col-start-3 col-span-2">
            <FormItem label="Renovated">
              <Input
                type="number"
                value={renovated}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRenovated(e.target.value)
                }
              />
            </FormItem>
            <FormItem className="mt-3" label="Year of construction">
              <Input
                type="number"
                value={yearOfConstruction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setYearOfConstruction(e.target.value)
                }
              />
            </FormItem>
          </div>
        </div>
        <div className="grid grid-cols-2 ">
          <ButtonPrimary disabled={disabled} onClick={handleSubmit}>
            Save
          </ButtonPrimary>
        </div>
      </div>
    </EditListingContainer>
  )
}

export default EditListingDescription
