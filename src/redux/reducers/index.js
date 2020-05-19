import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

const global = (state = [], action) => {
  return state;
};
const rootReducer = combineReducers({
  global,
  form: formReducer,
});
export default rootReducer;
