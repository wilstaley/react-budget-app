import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { BudgetsProvider } from './contexts/BudgetsContext'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
