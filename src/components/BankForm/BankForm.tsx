import React, { useState } from 'react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import Label from 'components/shared/Label'
import InputWithHelper from 'components/shared/InputWithHelper'

interface Values {
  accountName: string
  accountNumber: number
  bankName: string
  ifsc: string
}

const BankForm: React.FC = () => {
  const [initialValues, setInitialValues] = useState<Values>({
    accountName: '',
    accountNumber: NaN,
    bankName: '',
    ifsc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setInitialValues({ ...initialValues, [name]: value })
  }

  return (
    <div className="w-full text-center ">
      BankForm
      <Formik
        initialValues={initialValues}
        onSubmit={(values: Values, actions) => {
          console.log({ values, actions })
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }}
      >
        <Label>Account Name</Label>
        <InputWithHelper
          className="mt-1.5"
          value={initialValues.accountName}
          name="accountName"
          onChange={handleChange}
        />
        <Label>Account Number</Label>
        <InputWithHelper
          className="mt-1.5"
          value={initialValues.accountNumber}
          name="accountNumber"
          onChange={handleChange}
        />
        <Label>Bank Name</Label>
        <InputWithHelper
          className="mt-1.5"
          value={initialValues.bankName}
          name="bankName"
          onChange={handleChange}
        />
        <Label>IFSC</Label>
        <InputWithHelper
          className="mt-1.5"
          value={initialValues.ifsc}
          name="ifsc"
          onChange={handleChange}
        />
      </Formik>
    </div>
  )
}

export default BankForm
