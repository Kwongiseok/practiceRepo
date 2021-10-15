const { createStore } = require("redux");

const reducer = (prevState, action) => {
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

    case "ADD_POST":
      return {
        ...prevState,
        posts: [...prevState.posts, action.data],
      };

    default:
      return prevState;
  }
};

const initialState = {
  user: "기석",
  posts: [{ id: 1 }],
};

const store = createStore(reducer, initialState);

const logIn = (data) => {
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

const addPost = (data) => {
  return {
    type: "ADD__POST",
    data,
  };
};

console.log("1: ", store.getState());

store.dispatch(
  logIn({
    id: 1,
    name: "기기",
    admint: true,
  })
);
console.log("2: ", store.getState());

store.dispatch(
  addPost({
    userId: 1,
    id: 1,
    content: "안녕하세요. 리덕스",
  })
);
console.log("3: ", store.getState());

store.dispatch(logOut());

console.log(store.getState());
