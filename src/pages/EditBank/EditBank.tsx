import BankForm from 'components/BankForm/BankForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditBank = () => {
  const { bankId } = useParams<{ bankId: string }>()

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <BankForm bankId={bankId} />
    </div>
  )
}
export default EditBank
