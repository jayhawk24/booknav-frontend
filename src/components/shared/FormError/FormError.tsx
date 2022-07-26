import React from 'react'

type Props = {
  className?: string
  text?: string
}

function FormError({ className, text }: Props) {
  if (!text) return null
  return (
    <span className={`text-red-600 text-xs italic ${className}`}>{text}</span>
  )
}

export default FormError
