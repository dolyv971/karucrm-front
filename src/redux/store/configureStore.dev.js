import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
// import logger from "../middleware";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = () => {
  const store = createStore(rootReducer, [], composeEnhancers(applyMiddleware(logger, thunk)));
  return store;
};

export default configureStore;
