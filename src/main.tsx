import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import './index.css'
import { APP_VERSION } from './version'

console.log('App Version:', APP_VERSION)

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#252927',
    },
    secondary: {
      main: '#938B7E',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
