import React from 'react'
import styled from 'styled-components'

import MenuItem from './MenuItem'

const StyledMenu = styled.ul`
  margin-left: 24px;
`

const Menu = ({ items = [] }) => {
  return (
    <StyledMenu>
      {items.map(item => (
        <MenuItem
          key={item.id}
          item={item}
        />
      ))}
    </StyledMenu>
  )
}

export default Menu
