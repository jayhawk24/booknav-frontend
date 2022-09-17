import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
  accountName: Yup.string().required('Account Name is required'),
  accountNumber: Yup.string().required('Account Number is required'),
  bankName: Yup.string().required('Bank Name is required'),
  ifscCode: Yup.string().required('IFSC is required'),
})
