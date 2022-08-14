import GhatForm from 'components/GhatForm'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditNaav = () => {
  const { naavId } = useParams<{ naavId: string }>()

  return <GhatForm />
}

export default EditNaav
