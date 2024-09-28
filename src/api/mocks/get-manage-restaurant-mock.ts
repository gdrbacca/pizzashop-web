import { http, HttpResponse } from 'msw'

import { GetProfileRestaurant } from '../get-manage-restaurant'

export const getManageRestaurantMock = http.get<
  never,
  never,
  GetProfileRestaurant
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'customid',
    name: 'Meu restaurante',
    description: 'Muito massa',
    managerId: 'cusrtomiod',
    createdAt: new Date(),
    updatedAt: null,
  })
})
