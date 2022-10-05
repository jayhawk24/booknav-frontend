import GhatForm from 'components/GhatForm'
import { useParams } from 'react-router-dom'

const EditGhat = () => {
  const { ghatId } = useParams<{ ghatId: string }>()

  return (
    <div>
      <GhatForm ghatId={ghatId} />
    </div>
  )
}

export default EditGhat
