import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'cusrtomiod',
      name: 'Claudio',
      email: 'claudio@email.com',
      phone: '3333446464',
      createdAt: new Date(),
      role: 'manager',
      updatedAt: null,
    })
  },
)
