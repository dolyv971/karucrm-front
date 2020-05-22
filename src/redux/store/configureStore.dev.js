import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
// import logger from "../middleware";

const configureStore = () => {
  const store = createStore(rootReducer, [], applyMiddleware(logger, thunk));
  return store;
};

export default configureStore;
