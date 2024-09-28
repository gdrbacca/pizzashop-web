import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01/2025', receipt: 2500 },
    { date: '02/01/2025', receipt: 250 },
    { date: '03/01/2025', receipt: 1520 },
    { date: '04/01/2025', receipt: 500 },
    { date: '05/01/2025', receipt: 450 },
    { date: '06/01/2025', receipt: 320 },
    { date: '07/01/2025', receipt: 150 },
  ])
})
