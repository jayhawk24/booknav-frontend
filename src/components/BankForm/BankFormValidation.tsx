import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  accountName: Yup.string()
    .min(3, 'Must be more than 2 characters')
    .required('Account Name is required'),
  accountNumber: Yup.string()
    .min(6, 'Enter more than 5 number')
    .max(24, 'Too Long!')
    .required('Account Number is required'),
  bankName: Yup.string()
    .min(4, 'Must be more than 3 characters')
    .required('Bank Name is required'),
  ifscCode: Yup.string()
    .min(11, 'Required 11 characters')
    .max(13, 'Too long!')
    .required('IFSC is required'),
})
