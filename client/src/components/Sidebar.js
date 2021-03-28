import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { isArray } from 'lodash'

import { fetchMenuItems } from '../utils/menuItems'
import menuItemsApi from '../apis/menuItems'
import Menu from './Menu'

const StyledSidebar = styled.section`
  height: 100vh;
  background: #eee;
`

const Sidebar = () => {
  // States
  const [menuItems, setMenuItems] = useState([])

  // Lifecycle events
  useEffect(() => {
    const fetchRootLevelMenuItems = async () => {
      let menuItemIds

      try {
        const { data } = await menuItemsApi.get('/0')

        menuItemIds = isArray(data.items) ? data.items : []
      } catch (error) {
        // @todo Handle failed XHR request.
        menuItemIds = []
      }

      const menuItems = await fetchMenuItems(menuItemIds)

      setMenuItems(menuItems)
    }

    fetchRootLevelMenuItems()
  }, [])

  return (
    <StyledSidebar>
      <Menu items={menuItems} />
    </StyledSidebar>
  )
}

export default Sidebar
