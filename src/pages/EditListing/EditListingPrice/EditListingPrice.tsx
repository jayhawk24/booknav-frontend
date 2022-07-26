import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import FormItem from 'components/shared/FormItem'
import Input from 'components/shared/Input/Input'
import InputWithHelper from 'components/shared/InputWithHelper'
import Label from 'components/shared/Label'
import Select from 'components/shared/Select/Select'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import PricingService from 'services/editListings/pricing'
import EditListingContainer from '../EditListingContainer'

const EditListingPrice = () => {
  // const [showPrices, setShowPrices] = useState(false)

  const [pricePerMonth, setPricePerMonth] = useState('')
  const [pricePerWeek, setPricePerWeek] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [advanceNotice, setAdvanceNotice] = useState('')
  const [advanceNoticeUnit, setAdvanceNoticeUnit] = useState('hours')
  const [disableNotice, setDisableNotice] = useState(false)
  const [errors, setErros] = useState({ advance_notice_of: '' })
  const { yachtId } = useParams<{ yachtId: string }>()

  const handleUpdatePricing = () => {
    setDisabled(true)
    toast
      .promise(
        PricingService.updatePricing({
          yachtId,
          data: {
            hour: parseFloat(pricePerHour),
            day: parseFloat(pricePerDay),
            week: parseFloat(pricePerWeek),
            month: parseFloat(pricePerMonth),
          },
        }),
        {
          loading: 'Updating...',
          success: response => response.data.msg,
          error: error => error.response.data.msg,
        },
      )
      .finally(() => setDisabled(false))
  }

  const handleUpdateNotice = () => {
    setDisableNotice(true)
    toast
      .promise(
        PricingService.updateNotice({
          yachtId,
          data: { advance_notice_of: parseFloat(advanceNotice) },
          unit: advanceNoticeUnit,
        }),
        {
          loading: 'Updating...',
          success: response => response.data.msg,
          error: "Can't update advance notice",
        },
      )
      .catch(error => setErros(error.response.data))
      .finally(() => setDisableNotice(false))
  }

  return (
    <EditListingContainer>
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Reference Price</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <Label>
          Set a base rental price for your boat. This should be the lowest price
          you are willing to accept for rentals. You will then be able to add
          custom price periods
        </Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Price per month">
            <Input
              value={pricePerMonth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPricePerMonth(e.target.value)
              }
              type="number"
              placeholder="AED"
            />
          </FormItem>
          <FormItem label="Price per week">
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPricePerWeek(e.target.value)
              }
              value={pricePerWeek}
              type="number"
              placeholder="AED"
            />
          </FormItem>
          <FormItem label="Price per day">
            <Input
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPricePerDay(e.target.value)
              }
              value={pricePerDay}
              placeholder="AED"
            />
          </FormItem>
          <FormItem label="Price per hour">
            <Input
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPricePerHour(e.target.value)
              }
              value={pricePerHour}
              placeholder="AED"
            />
          </FormItem>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ButtonPrimary onClick={handleUpdatePricing} disabled={disabled}>
            Save
          </ButtonPrimary>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14 m-auto mt-3 "></div>

        <div>
          <h2 className="text-xl font-semibold">Reservation Settings</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <Label>
          Set minimum and maximum charter periods and advance notice for your
          boat. This is the amount of time you will allow guests to book a
          reservation.
        </Label>

        <div className="grid grid-cols-2 text-md gap-5">
          <FormItem label="Min Charter period">
            <div className="grid gap-2 grid-cols-2">
              <Input type="number" />
              <Select className="">
                <option>Hour</option>
                <option>Day</option>
                <option>Week</option>
                <option>Month</option>
              </Select>
            </div>
          </FormItem>

          <FormItem label="Max Charter period">
            <div className="grid gap-2 grid-cols-2">
              <Input type="number" />
              <Select className="">
                <option>Hour</option>
                <option>Day</option>
                <option>Week</option>
                <option>Month</option>
              </Select>
            </div>
          </FormItem>

          {/* <h1 className="font-semibold text-lg justify-center items-center flex mt-10">
            Day of departure
          </h1>
          <Select className=" mt-10 text-md">
            <option>Sunday</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
          </Select> */}

          <FormItem label="Advance Notice">
            <div className="grid gap-2 grid-cols-2">
              <div>
                <InputWithHelper
                  value={advanceNotice}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAdvanceNotice(e.target.value)
                  }
                  type="number"
                  helperText={errors.advance_notice_of}
                />
              </div>
              <Select
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setAdvanceNoticeUnit(event.target.value)
                }
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </Select>
            </div>
          </FormItem>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ButtonPrimary onClick={handleUpdateNotice} disabled={disableNotice}>
            Save
          </ButtonPrimary>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14 m-auto mt-3 "></div>
      </div>
    </EditListingContainer>
  )
}

export default EditListingPrice
