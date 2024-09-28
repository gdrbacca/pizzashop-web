import { api } from '@/lib/axios'

export type GetMonthRevenueResponse = {
  amount: number
  product: string
}[]

export async function getPopularProducts() {
  const response = await api.get<GetMonthRevenueResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
