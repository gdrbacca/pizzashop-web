import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { OrderTableFilter } from './order-table-filters'

describe('OrderTableFilter', () => {
  it('should check if the fields are filled according to path data', () => {
    const wrapper = render(<OrderTableFilter />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter
            initialEntries={[
              '/orders?orderId=123456&customerName=Claudio&status=pending&page=1',
            ]}
          >
            {children}
          </MemoryRouter>
        )
      },
    })
    // wrapper.debug()
    const OrderId = wrapper.getByPlaceholderText(
      'ID do pedido',
    ) as HTMLInputElement
    const nameInput = wrapper.getByPlaceholderText(
      'Nome do cliente',
    ) as HTMLInputElement

    const statusButton = wrapper.queryByDisplayValue('Pendente')

    expect(nameInput.value).toEqual('Claudio')
    expect(OrderId.value).toEqual('123456')
    expect(statusButton).toBeInTheDocument()
  })

  it('should reset fields and check if they are empty', async () => {
    const user = userEvent.setup()
    const wrapper = render(<OrderTableFilter />, {
      wrapper: ({ children }) => {
        return (
          <MemoryRouter
            initialEntries={[
              '/orders?orderId=123456&customerName=Claudio&status=pending&page=1',
            ]}
          >
            {children}
          </MemoryRouter>
        )
      },
    })
    // wrapper.debug()

    const filterButton = wrapper.getByRole('button', {
      name: 'Remover filtros',
    })

    await user.click(filterButton)

    const OrderId = wrapper.getByPlaceholderText(
      'ID do pedido',
    ) as HTMLInputElement
    const nameInput = wrapper.getByPlaceholderText(
      'Nome do cliente',
    ) as HTMLInputElement

    const statusButton = wrapper.queryByDisplayValue('Pendente')

    expect(nameInput.value).toEqual('')
    expect(OrderId.value).toEqual('')
    expect(statusButton).not.toBeInTheDocument()
  })
})
