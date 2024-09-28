import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

/* const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 500 },
  { date: '12/12', revenue: 800 },
  { date: '13/12', revenue: 850 },
  { date: '14/12', revenue: 710 },
  { date: '15/12', revenue: 900 },
  { date: '16/12', revenue: 1100 },
] */

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((charItem) => {
      return {
        date: charItem.date,
        receipt: charItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6 hover:bg-background">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita diária
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período: </Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontsize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke="#888"
                tickLine={false}
                width={90}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <CartesianGrid
                vertical={false}
                strokeOpacity="50%"
                className="stroke-muted-foreground"
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet['500']}
              />
              <Tooltip animationDuration={100} separator=": " />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
