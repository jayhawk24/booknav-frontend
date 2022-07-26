import { EditListingSidebar } from 'components/shared/Sidebars/EditListingSidebar'
import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

const EditListingContainer = ({ className, children }: Props) => {
  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <EditListingSidebar />
          </div>
        </div>
        <div className="w-full lg:w-9/12 xl:w-9/12  space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {children}
        </div>
      </main>
    </div>
  )
}

export default EditListingContainer
