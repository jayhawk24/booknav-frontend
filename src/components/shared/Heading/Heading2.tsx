import React from 'react'
import { ReactNode } from 'react'

export interface Heading2Props {
  heading?: ReactNode
  subHeading?: ReactNode
  className?: string
}

const Heading2: React.FC<Heading2Props> = ({
  className = '',
  heading = 'Superboats in Dubai',
  subHeading,
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
        {subHeading}
        {/* <span className="mx-2">·</span>
          Aug 12
          <span className="mx-2">·</span>12 Guests */}
      </span>
    </div>
  )
}

export default Heading2
