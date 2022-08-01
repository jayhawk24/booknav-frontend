import ButtonSecondary from 'components/shared/Buttons/ButtonSecondary'
import useGhats from 'hooks/useGhats'
import React, { useEffect } from 'react'

const GhatList = () => {
  const { data } = useGhats()

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <ButtonSecondary>Add Ghat</ButtonSecondary>
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
                <tbody className="bg-white divide-y divide-gray-300">
                  <tr className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">1</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">Jon doe</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        jhondoe@example.com
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      2021-1-12
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full"
                      >
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GhatList
