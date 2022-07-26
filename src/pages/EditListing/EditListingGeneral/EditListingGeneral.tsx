import React from 'react'

import EditListingContainer from '../EditListingContainer'
import AddBoatForm from 'components/AddBoatForm'
import { useParams } from 'react-router-dom'

const EditListingGeneral = () => {
  const { yachtId } = useParams<{ yachtId?: string }>()

  return (
    <EditListingContainer>
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Your Yatch</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <AddBoatForm saved={true} yachtId={yachtId} />
      </div>
    </EditListingContainer>
  )
}

export default EditListingGeneral
