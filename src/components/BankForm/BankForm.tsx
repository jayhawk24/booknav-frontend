import React, { useState } from 'react'
import { Formik } from 'formik'
import Label from 'components/shared/Label'
import InputWithHelper from 'components/shared/InputWithHelper'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import toast from 'react-hot-toast'
import BankService from 'services/bank'

export interface BankInfo {
  accountName: string
  accountNumber: number
  bankName: string
  ifscCode: string
}

const BankForm: React.FC = () => {
  const initialValues = {
    accountName: '',
    accountNumber: 0,
    bankName: '',
    ifscCode: '',
  }

  const handleSubmit = (values: BankInfo, actions: any) => {
    const data = {
      accountName: values.accountName,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      ifscCode: values.ifscCode,
    }

    toast
      .promise(BankService.addBank(data), {
        loading: 'Adding Bank data',
        success: 'Bank added successfully.',
        error: 'Error adding, please try again',
      })
      .then(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <div className="w-full">
      Bank Details:
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Label>Account Name</Label>
            <InputWithHelper
              className="mt-1.5"
              value={values.accountName}
              name="accountName"
              onChange={handleChange}
            />
            <Label>Account Number</Label>
            <InputWithHelper
              className="mt-1.5"
              value={values.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              type="number"
            />
            <Label>Bank Name</Label>
            <InputWithHelper
              className="mt-1.5"
              value={values.bankName}
              name="bankName"
              onChange={handleChange}
            />
            <Label>IFSC</Label>
            <InputWithHelper
              className="mt-1.5"
              value={values.ifscCode}
              name="ifscCode"
              onChange={handleChange}
            />
            <div className="pt-2 pb-5">
              <ButtonPrimary type="submit">Save</ButtonPrimary>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default BankForm
