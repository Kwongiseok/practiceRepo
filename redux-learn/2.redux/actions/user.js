const logInRequest = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};
const logInSuccess = (data) => {
  return {
    type: "LOG_IN_Success",
    data,
  };
};
const asyncLogIn = (data) => {
  // async action creator
  return (dispatch, getState) => {
    dispatch(logInRequest(data));
    setTimeout(() => {
      dispatch(
        logInSuccess({
          userId: 1,
          nickname: "giseok",
        })
      );
    }, 2000);
  };
};

const logIn = (data) => {
  // sync action creator
  return {
    type: "LOG_IN",
    data,
  };
};

const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

module.exports = {
  logIn,
  logOut,
  asyncLogIn,
};
