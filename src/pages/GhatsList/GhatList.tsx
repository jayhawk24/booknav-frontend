import Button from 'components/shared/Buttons/Button'
import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import NcImage from 'components/shared/NcImage'
import useGhats from 'hooks/useGhats'
import React from 'react'
import { Link } from 'react-router-dom'
import requestClient from 'services/requestClient'

const GhatList = () => {
  const { data } = useGhats()
  // const {title, description, picture} = data

  const handleDelete = (_id: string) => {
    requestClient.delete(`/ghat/${_id}`)
  }

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <ButtonSecondary>
          <Link to="/ghats/add">Add Ghat</Link>{' '}
        </ButtonSecondary>
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table className="divide-y divide-gray-300 overflow-x-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">S.no.</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Name</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Description
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Image</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                  </tr>
                </thead>
                {data?.map(ghat => (
                  <tbody
                    key={ghat._id}
                    className="bg-white divide-y divide-gray-300"
                  >
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">1</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {ghat.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {ghat?.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <NcImage src={ghat.picture} />
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          href="#"
                          className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                        >
                          Edit
                        </Button>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                          onClick={() => handleDelete(ghat._id)}
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
