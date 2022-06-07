import {combineReducers} from 'redux';
import {UserReducer} from './user';
import {PokeReducer} from './pokemon';

const reducer = combineReducers({
  UserReducer,
  PokeReducer,
});

export default reducer;
