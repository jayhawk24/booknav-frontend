import { Review } from 'services/addBoat'

const averageRating = (reviews?: Review[]) => {
  return (
    (
      reviews &&
      reviews?.reduce((acc, curr) => acc + curr.rating, 0) / reviews?.length
    )?.toFixed(1) || 0
  )
}

export default averageRating
