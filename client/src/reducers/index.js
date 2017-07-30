import { combineReducers } from 'redux'

import { greeting } from './greeting'
import { machines } from './machines'
import { selectedMachine } from './selectedMachine'
import { search } from './search'
import { Reducers as gridReducers } from 'react-redux-grid'

const rootReducer = combineReducers({
  greeting,
  machines,
  selectedMachine,
  search,
  ...gridReducers
})

export default rootReducer
