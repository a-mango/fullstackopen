import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from 'Components/ErrorBoundary'
import store from 'Utilities/store'
import App from './App'
import 'Assets/main.css'

const refresh = () =>
  render(
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root')
  )

refresh()

if (module.hot) {
  module.hot.accept()
}
