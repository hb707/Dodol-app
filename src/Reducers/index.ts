import { combineReducers } from 'redux';
import user from './user';
import capsule from './capsule';
import memory from './memory';

const rootReducer = combineReducers({
  user,
  capsule,
  memory,
});

export default rootReducer;
