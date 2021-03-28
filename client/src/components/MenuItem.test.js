import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'

import menuItemsApi from '../apis/menuItems'
import MenuItem from './MenuItem'

const item = {
  id: 1,
  name: 'Test menu item',
  items: [2]
}

let menuItemComponent

beforeEach(() => {
  menuItemComponent = <MenuItem item={item} />
})

afterEach(cleanup)

test('renders in the DOM', () => {
  const div = document.createElement('div')

  ReactDOM.render(menuItemComponent, div)
})

test('renders menu item name', () => {
  const { getByTestId } = render(menuItemComponent)

  expect(getByTestId('menu-item-name')).toHaveTextContent('Test menu item')
})

test('matches snapshot', () => {
  const tree = renderer.create(menuItemComponent).toJSON()

  expect(tree).toMatchSnapshot()
})

test('loads sub-menu items and expands sub-menu', async () => {
  const apiSpy = menuItemsApi.get = jest.fn().mockResolvedValueOnce(
    {
      data: {
        id: 2,
        name: 'Test sub-menu item'
      }
    }
  )
  const { getByTestId } = render(menuItemComponent)

  fireEvent.click(getByTestId('menu-item-name'))

  expect(apiSpy).toHaveBeenCalledWith('/2')

  await waitFor(() => {
    expect(getByTestId('sub-menu')).toBeInTheDocument()
  })
})
