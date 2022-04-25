import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './mui-theme'

import 'sweetalert2/src/sweetalert2.scss'


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
    <App />
    </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
)
