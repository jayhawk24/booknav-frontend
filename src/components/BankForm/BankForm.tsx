import React, { useState } from 'react'
import { Formik } from 'formik'
import Label from 'components/shared/Label'
import InputWithHelper from 'components/shared/InputWithHelper'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'

interface Values {
  accountName: string
  accountNumber: number
  bankName: string
  ifsc: string
}

const BankForm: React.FC = () => {
  const [user, setUser] = useState<Values[]>([])
  const initialValues = {
    accountName: '',
    accountNumber: NaN,
    bankName: '',
    ifsc: '',
  }

  return (
    <div className="w-full text-center ">
      BankForm
      <Formik
        initialValues={initialValues}
        onSubmit={(values: Values, actions) => {
          console.log({ values, actions })
          alert(JSON.stringify(values, null, 2))
          setUser([...user, values])
          // actions.setSubmitting(false)
        }}
      >
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
              value={values.ifsc}
              name="ifsc"
              onChange={handleChange}
            />
            <ButtonPrimary type="submit">Save</ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default BankForm
