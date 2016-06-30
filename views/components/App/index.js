import React from 'react'
import { asyncConnect } from 'redux-connect'

import './styles'

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
