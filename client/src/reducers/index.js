import { combineReducers } from 'redux'

import { greeting, socketGreeting } from './greetings'
import { machines } from './machines'
import { Reducers as gridReducers } from 'react-redux-grid'

const rootReducer = combineReducers({
  greeting,
  socketGreeting,
  machines,
  ...gridReducers
})

export default rootReducer
