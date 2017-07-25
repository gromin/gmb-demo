import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';

const idReducer = (state = [], payload) => state;

const rootReducer = combineReducers({
  idReducer,
  ...gridReducers
});

export default rootReducer;
