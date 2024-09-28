import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { ApproveOrder } from '@/api/approve-order'
import { CancelOrder } from '@/api/cancel-order'
import { DeliverOrder } from '@/api/deliver-order'
import { DispatchOrder } from '@/api/dispatch-order'
import { getOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateStatusOnCache(orderId: string, status: OrderStatus) {
    const cached = queryClient.getQueriesData<getOrdersResponse>({
      queryKey: ['orders'],
    })

    cached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<getOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }

          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: CancelOrder,
      onSuccess(_, { orderId }) {
        updateStatusOnCache(orderId, 'canceled')
      },
      onError() {
        console.log('errpr')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: ApproveOrder,
      onSuccess(_, { orderId }) {
        updateStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: DispatchOrder,
      onSuccess(_, { orderId }) {
        updateStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: DeliverOrder,
      onSuccess(_, { orderId }) {
        updateStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              className="transition-all hover:bg-background active:bg-muted-foreground"
            >
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3 text-muted-foreground" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3 text-muted-foreground" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3 text-muted-foreground" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3 text-primary" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
