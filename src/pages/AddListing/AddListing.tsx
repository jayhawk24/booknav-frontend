import React, { FC } from 'react'
import AddBoatForm from 'components/AddBoatForm'

const AddListing1: FC = () => {
  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        <div className="listingSection__wrap ">
          <h2 className="text-2xl font-semibold">Ahoy Captain</h2>
          <p>List your Yacht in few easy steps. (All fields are required)</p>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

          {/* FORM */}
          <AddBoatForm />
        </div>
      </div>
    </div>
  )
}

export default AddListing1
