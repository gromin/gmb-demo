import { combineReducers } from 'redux'

import { greeting } from './greetings'
import { machines } from './machines'
import { Reducers as gridReducers } from 'react-redux-grid'

const rootReducer = combineReducers({
  greeting,
  machines,
  ...gridReducers
})

export default rootReducer
