import BankForm from 'components/BankForm/BankForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditBank = () => {
  const { bankId } = useParams<{ bankId: string }>()

  return (
    <div>
      <BankForm bankId={bankId} />
    </div>
  )
}
export default EditBank
