import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'joao@email.com',
      phone: '123132132131',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: {
          name: 'queijos',
        },
        quantity: 50,
      },
    ],
    totalInCents: 50000,
  })
})
