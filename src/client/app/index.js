import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './Reducers/reducer'
import { getPersonsAsynch  } from './ActionTypes/person_actions'
import HomeContainer from './Containers/home_container'

class App extends Component {
  render() {
    return (
        <div>
          <HomeContainer />
        </div>
    )
  }
}
let store = createStore(reducer, applyMiddleware(thunk, logger))
store.dispatch(getPersonsAsynch())

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'));
