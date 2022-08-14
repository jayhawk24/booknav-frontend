import Button from 'components/shared/Buttons/Button'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import useBoatTypes from 'hooks/useBoatTypes'
import { Link } from 'react-router-dom'

const GhatList = () => {
  const { data } = useBoatTypes()

  const handleDelete = (_id: string) => {
    // GhatService.deleteGhat(_id)
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <ButtonSecondary className="mb-7">
          <Link to="/ghats/add">Add Boat Types</Link>{' '}
        </ButtonSecondary>
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">S.no.</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                  </tr>
                </thead>
                {data?.map((boatType, index) => (
                  <tbody
                    key={boatType._id}
                    className="bg-white divide-y divide-gray-300"
                  >
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {boatType.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          {' '}
                          <Link to={`/ghats/${boatType._id}`}>Edit</Link>
                        </Button>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                          onClick={() => handleDelete(boatType._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GhatList
