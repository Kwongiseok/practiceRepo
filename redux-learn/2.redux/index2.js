const { createStore } = require("redux");
const reducer = require("./reducers/index");
const { logIn, logOut } = require("./actions/user");
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

const store = createStore(reducer, initialState, enhancer);

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
