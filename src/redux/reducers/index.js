import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import global from "./global";

const rootReducer = combineReducers({
  global,
  form: formReducer,
});
export default rootReducer;
