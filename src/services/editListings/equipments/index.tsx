import requestClient from 'services/requestClient'

export type EquipmentType = {
  id: string
  name: string
}

export type EquipmentResponseType = {
  data: EquipmentType[]
}

export default class EquipmentService {
  static getEquipmentTypes(): Promise<EquipmentResponseType> {
    return requestClient.get('/api/yacht-management/equipment/types/')
  }
  static getEquipments(equipmentId: string): Promise<EquipmentResponseType> {
    return requestClient.get(
      `/api/yacht-management/equipment/types/${equipmentId}`,
    )
  }
  static addEquipment(
    yachtId: string,
    equipment: EquipmentType,
  ): Promise<EquipmentResponseType> {
    return requestClient.post(
      `/api/yacht-management/yacht/${yachtId}/equipment/`,
      {
        equipments: equipment.id,
      },
    )
  }
  static removeEquipment(
    yachtId: string,
    equipment: EquipmentType,
  ): Promise<EquipmentResponseType> {
    return requestClient.delete(
      `/api/yacht-management/yacht/${yachtId}/equipment/${equipment.id}/`,
    )
  }
}
