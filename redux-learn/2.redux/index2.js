const { createStore, compose, applyMiddleware } = require("redux");
const reducer = require("./reducers/index");
const { logIn, logOut, asyncLogIn } = require("./actions/user");
const { addPost } = require("./actions/post");

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
  comments: [],
  favorites: [],
  history: [],
  likes: [],
  followers: [],
};

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅 : ", action);
  return dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === "function") {
    // "비동기 액션은 함수로 넣어주겠다." 로 약속해서 사용할 수 있다.
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

const store = createStore(reducer, initialState, enhancer);

console.log("1: ", store.getState());

store.dispatch(
  asyncLogIn({
    id: 1,
    name: "기기",
    admint: true,
  })
);
console.log("2: ", store.getState());

// store.dispatch(
//   addPost({
//     userId: 1,
//     id: 1,
//     content: "안녕하세요. 리덕스",
//   })
// );
// console.log("3: ", store.getState());

// store.dispatch(logOut());

// console.log(store.getState());
