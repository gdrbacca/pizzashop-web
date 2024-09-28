import { zodResolver } from '@hookform/resolvers/zod'
import { FilterIcon, Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    },
  )

  function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
    setSearchParams((prev) => {
      if (orderId) {
        prev.set('orderId', orderId)
      } else {
        prev.delete('orderId')
      }
      if (customerName) {
        prev.set('customerName', customerName)
      } else {
        prev.delete('customerName')
      }
      if (status) {
        prev.set('status', status)
      } else {
        prev.delete('status')
      }

      prev.set('page', '1')

      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '1')

      return prev
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <FilterIcon size={16} /> Filtros
      <span className="text-sm font-semibold"></span>
      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto focus-visible:ring-1"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px] focus-visible:ring-1"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        data-testid="select"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entrege</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />
      <Button type="submit" variant={'secondary'} size={'xs'}>
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant={'outline'}
        size={'xs'}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
