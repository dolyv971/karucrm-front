const logger = ({ getState }) => {
  return next => action => {
    const returnValue = next(action);
    console.log('will dispatch', action)
    console.log('state after dispatch', getState())

    return returnValue;
  }
};

export default logger;
