import React, { useState } from 'react'
import { Formik } from 'formik'
import Label from 'components/shared/Label'
import InputWithHelper from 'components/shared/InputWithHelper'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import toast from 'react-hot-toast'
import BankService, { BankInfo } from 'services/bank'
import { useQuery } from 'react-query'
import { LoginSchema } from './BankFormValidation'

const BankForm: React.FC = () => {
  const { data: bank } = useQuery('getBank', async () => {
    const data = await BankService.getBank()
    return data
  })
  const initialValues = {
    accountName: bank?.[0]?.accountName || '',
    accountNumber: bank?.[0]?.accountNumber || 0,
    bankName: bank?.[0]?.bankName || '',
    ifscCode: bank?.[0]?.ifscCode || '',
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (values: BankInfo) => {
    const data = {
      accountName: values.accountName,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      ifscCode: values.ifscCode,
    }
    setIsLoading(true)

    if (!bank) {
      toast
        .promise(BankService.addBank(data), {
          loading: 'Adding Bank data',
          success: 'Bank added successfully.',
          error: 'Error adding, please try again',
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      toast
        .promise(BankService.updateBank(data, bank?.[0]._id), {
          loading: 'Updating...',
          success: 'Updated.',
          error: 'Error, please try again',
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">Bank Details:</h2>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit, values, handleChange, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Account Name</Label>
                <InputWithHelper
                  className="mt-1.5"
                  value={values.accountName}
                  name="accountName"
                  onChange={handleChange}
                />
                {errors.accountName && touched.accountName ? (
                  <p className="text-red-700">{errors.accountName}</p>
                ) : null}
              </div>
              <div>
                <Label>Account Number</Label>
                <InputWithHelper
                  className="mt-1.5"
                  value={values.accountNumber}
                  name="accountNumber"
                  onChange={handleChange}
                  type="number"
                />
                {errors.accountNumber && touched.accountNumber ? (
                  <p className="text-red-700">{errors.accountNumber}</p>
                ) : null}
              </div>
              <div>
                <Label>Bank Name</Label>
                <InputWithHelper
                  className="mt-1.5"
                  value={values.bankName}
                  name="bankName"
                  onChange={handleChange}
                />
                {errors.bankName && touched.bankName ? (
                  <p className="text-red-700">{errors.bankName}</p>
                ) : null}
              </div>
              <div>
                <Label>IFSC</Label>
                <InputWithHelper
                  className="mt-1.5"
                  value={values.ifscCode}
                  name="ifscCode"
                  onChange={handleChange}
                />
                {errors.ifscCode && touched.ifscCode ? (
                  <p className="text-red-700">{errors.ifscCode}</p>
                ) : null}
              </div>
              <div className="pt-2 pb-5">
                <ButtonPrimary
                  type="submit"
                  className="w-1/3"
                  loading={isLoading}
                >
                  Save
                </ButtonPrimary>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default BankForm
