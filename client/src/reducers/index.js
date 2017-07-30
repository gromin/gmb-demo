import { combineReducers } from 'redux'

import { userCanWrite } from './userCanWrite'
import { greeting } from './greeting'
import { machines } from './machines'
import { selectedMachine } from './selectedMachine'
import { search } from './search'
import { Reducers as gridReducers } from 'react-redux-grid'

const rootReducer = combineReducers({
  userCanWrite,
  greeting,
  machines,
  selectedMachine,
  search,
  ...gridReducers
})

export default rootReducer
