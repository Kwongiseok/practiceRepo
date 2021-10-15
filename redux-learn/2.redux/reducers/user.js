const initialState = {
  isLoggingIn: true,
  data: null,
};

const userReducer = (prevState = initialState, action) => {
  // 새로운 state 만들어주기
  switch (action.type) {
    case "LOG_IN":
      return {
        ...prevState,
        user: action.data,
      };

    case "LOG_OUT":
      return {
        ...prevState,
        user: action.data,
      };

    default:
      return prevState;
  }
};

module.exports = {
  userReducer,
};
