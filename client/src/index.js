import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import 'reset-css'

import GlobalStyle from './GlobalStyle'
import App from './App'

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
  document.querySelector('#root')
)
