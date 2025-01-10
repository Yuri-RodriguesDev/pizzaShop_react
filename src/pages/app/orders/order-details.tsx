import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useQuery } from '@tanstack/react-query'


import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  TableBody,
  Table,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
  TableFooter,
} from '@/components/ui/table'
import { OrderDetailsSkeleton } from './order-details-skeleton'

export interface OrderDetailsprops {
  orderId: string
  open: boolean
}



export function OrderDetails({ orderId, open }: OrderDetailsprops) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {order ? (
        <div className='space-y-6'>
          <Table>
          <TableBody>
            <TableRow>
              <TableCell className='text-muted-foreground'>Status</TableCell>
              <TableCell className='flex justify-end'>
                <OrderStatus status={order.status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>Cliente</TableCell>
              <TableCell className='flex justify-end'>
                {order.customer.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>
                Telefone
              </TableCell>
              <TableCell className='flex justify-end'>
                {order.customer.phone ?? 'Não informado'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='text-muted-foreground'>E-mail</TableCell>
              <TableCell className='flex justify-end'>
                {order.customer.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='text-muted-foreground'>
                Realizado há
              </TableCell>
              <TableCell className='flex justify-end'>
                {formatDistanceToNow(order.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className='text-right'>Qtd.</TableHead>
                <TableHead className='text-right'>preço</TableHead>
                <TableHead className='text-right'>Subtotal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell className='text-right'>
                    {item.quantity}
                  </TableCell>
                  <TableCell className='text-right'>
                    {(item.priceInCents / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                  <TableCell className='text-right'>
                    {((item.priceInCents * item.quantity) / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>
                </TableRow>
              )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className='text-right font-medium'>
                  {(order.totalInCents / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton/>
      )}
    </DialogContent>
  )
}
// leo Leo yuri yuri