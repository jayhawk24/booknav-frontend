import Button from 'components/shared/Buttons/Button'
import useBank from 'hooks/useBank'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

const BankList: React.FC = () => {
  const { data } = useBank()

  const queryClient = useQueryClient()

  return (
    <div className="container mb-24 lg:mb-32" style={{ minHeight: '60vh' }}>
      <div className="w-full text-center">
        <div className="flex flex-col">
          <div className="w-full">
            <div
              className="border-b border-gray-200 shadow
            overflow-y-hidden overflow-x-scroll"
            >
              <table className="divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">S.no.</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Account Name
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Account Number
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Bank Name
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">IFSC</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                  </tr>
                </thead>
                {data?.map((item, index) => (
                  <tbody
                    key={item._id}
                    className="bg-white divide-y divide-gray-300"
                  >
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.accountName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.accountNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.bankName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {item.ifscCode}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          {' '}
                          <Link to={`/banklist/${item._id}`}>Edit</Link>
                        </Button>
                      </td>
                      <td className="px-6 py-4">
                        <Button className="px-4 py-1 text-red-600 bg-red-200 rounded-full">
                          {' '}
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

export default BankList
