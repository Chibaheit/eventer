'use strict'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { message } from 'antd'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './redux/store'

import App from './components/App'
import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Provider store={store}>
    <Router history={history}
            render={(props) => <ReduxAsyncConnect {...props} />}>
      <Route path="/" component={App} >
        <IndexRoute component={MainPage} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('react-root'))
