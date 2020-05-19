import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers";
import logger from "../middleware";

const configureStore = () => {
  const store = createStore(rootReducer,[], applyMiddleware(logger));
  return store;
};

export default configureStore;
