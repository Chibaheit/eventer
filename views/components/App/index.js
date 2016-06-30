import React from 'react'
import { asyncConnect } from 'redux-connect'

import { getProfile } from '../../redux/modules/user'

import './styles'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    dispatch(getProfile())
  }
}])
class App extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default App
