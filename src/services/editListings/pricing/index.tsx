import { GenericResponseType } from 'services/account'
import requestClient from 'services/requestClient'

type PricingUpdateRequestType = {
  yachtId: string
  data: {
    hour: number
    day: number
    week: number
    month: number
  }
}

type NoticeUpdateRequestType = {
  yachtId: string
  data: {
    advance_notice_of: number
  }
  unit: 'hours' | 'days' | string
}

export default class PricingService {
  static updatePricing({
    yachtId,
    data,
  }: PricingUpdateRequestType): Promise<GenericResponseType> {
    return requestClient.put(
      `/api/yacht-management/yacht/${yachtId}/pricing/`,
      data,
    )
  }
  static updateNotice({
    yachtId,
    data,
    unit,
  }: NoticeUpdateRequestType): Promise<GenericResponseType> {
    return requestClient.put(
      `/api/yacht-management/yacht/${yachtId}/charter/${unit}/`,
      data,
    )
  }
}
