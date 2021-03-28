import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { isArray } from 'lodash'

import { fetchMenuItems } from '../utils/menuItems'
import Menu from './Menu'

const StyledMenuItem = styled.li`
  & > p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 36px;
  }
`

const MenuItem = ({ item = {} }) => {
  const hasSubMenuItems = isArray(item.items) && item.items.length > 0

  // States
  const [subMenuItems, setSubMenuItems] = useState([])
  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false)

  // Lifecycle events
  useEffect(() => {
    if (isSubMenuExpanded) {
      loadSubMenuItems()
    }
  }, [isSubMenuExpanded])

  // Renderers
  const renderStatusIcon = () => {
    if (!hasSubMenuItems) {
      return null
    }

    return isSubMenuExpanded ? <AiOutlineUp style={{ marginLeft: '9px' }} /> : <AiOutlineDown style={{ marginLeft: '9px' }} />
  }

  // Event handlers
  const handleNameClick = () => {
    setIsSubMenuExpanded(!isSubMenuExpanded)
  }

  // Helpers
  const loadSubMenuItems = async () => {
    if (!hasSubMenuItems || subMenuItems.length > 0) {
      return
    }

    setSubMenuItems(await fetchMenuItems(item.items))
  }

  return (
    <StyledMenuItem>
      <p
        // aria-controls=""
        // aria-expanded=""
        onClick={handleNameClick}
        data-testid="menu-item-name"
      >{item.name}{renderStatusIcon()}</p>
      {hasSubMenuItems && isSubMenuExpanded && (
        <div data-testid="sub-menu">
          <Menu items={subMenuItems} />
        </div>
      )}
    </StyledMenuItem>
  )
}

export default MenuItem
