export const formSelector = (state) => {
  return state.form ? state.form : {};
};

export const notificationSelector = (state) => {
  return state.global.toast ? state.global.toast : {};
};
