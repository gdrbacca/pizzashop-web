import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './navlink'

describe('NavLink', () => {
  it('should highlight the nav link when its the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )
    wrapper.debug()

    expect(wrapper.getByText('Home').dataset.currenturl).toEqual('false')
    expect(wrapper.getByText('About').dataset.currenturl).toEqual('true')
  })
})
