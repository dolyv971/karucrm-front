import { combineReducers } from "redux";

import * as types from "../../actionTypes/globalActionTypes";

const initialState = {
  toast: {
    visible: false,
    type: "",
    message: "",
    title: "",
    time: 5000,
  },
};

const toast = (state = initialState.toast, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...action.payload,
        visible: true,
      };
    case types.HIDE_NOTIFICATION:
      return initialState.toast;
    default:
      return state;
  }
};

export default combineReducers({
  toast,
});
