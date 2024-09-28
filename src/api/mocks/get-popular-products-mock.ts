import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Pizza boa', amount: 50 },
    { product: 'Pizza ruim', amount: 90 },
    { product: 'Pizza gay', amount: 40 },
    { product: 'Pizza macho', amount: 35 },
    { product: 'Pizza invisivel', amount: 44 },
  ])
})
