import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import Checkbox from 'components/shared/Checkbox'
import EquipmentService, {
  EquipmentType,
} from 'services/editListings/equipments'
import EditListingContainer from '../EditListingContainer'

const EditListingEquipments = () => {
  const { yachtId } = useParams<{ yachtId: string }>()

  const { data: equipmentTypes } = useQuery('getEquipmentTypes', async () => {
    const { data } = await EquipmentService.getEquipmentTypes()
    return data
  })

  const getEquipment = async (id: string) => {
    const { data } = await EquipmentService.getEquipments(id)
    return data
  }

  const { data: equipments1 } = useQuery(
    ['getEquipments1', equipmentTypes],
    () => getEquipment('1'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments2 } = useQuery(
    ['getEquipments2', equipmentTypes],
    () => getEquipment('2'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments3 } = useQuery(
    ['getEquipments3', equipmentTypes],
    () => getEquipment('3'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments4 } = useQuery(
    ['getEquipments4', equipmentTypes],
    () => getEquipment('4'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments5 } = useQuery(
    ['getEquipments5', equipmentTypes],
    () => getEquipment('5'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments6 } = useQuery(
    ['getEquipments6', equipmentTypes],
    () => getEquipment('6'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments7 } = useQuery(
    ['getEquipments7', equipmentTypes],
    () => getEquipment('7'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )
  const { data: equipments8 } = useQuery(
    ['getEquipments8', equipmentTypes],
    () => getEquipment('8'),
    { staleTime: 24 * 60 * 60 * 1000 },
  )

  const equipments = [
    equipments1,
    equipments2,
    equipments3,
    equipments4,
    equipments5,
    equipments6,
    equipments7,
    equipments8,
  ]

  const handleAddEquipment = (equipment: EquipmentType) => {
    EquipmentService.addEquipment(yachtId, equipment)
  }

  const handleRemoveEquipment = (equipment: EquipmentType) => {
    EquipmentService.removeEquipment(yachtId, equipment)
  }

  return (
    <EditListingContainer>
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold"> Equipments </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-12">
          {equipmentTypes?.map((equipmentType: EquipmentType) => (
            <div key={equipmentType.id}>
              <label className="text-lg font-semibold" htmlFor="">
                {equipmentType.name}
              </label>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-sm">
                {equipments[Number(equipmentType.id) - 1]?.map(
                  (equipment: EquipmentType) => (
                    <Checkbox
                      key={equipment.id}
                      label={equipment.name}
                      onChange={checked => {
                        if (checked) handleAddEquipment(equipment)
                        else handleRemoveEquipment(equipment)
                      }}
                    />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditListingContainer>
  )
}

export default EditListingEquipments
