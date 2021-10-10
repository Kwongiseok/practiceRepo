import posts from "../../posts.json";

const Post = (props) => {
  return (
    <div>
      <h1>{props.post.title}</h1>
      <p>Published on {props.date}</p>
      <p>{props.post.content}</p>
    </div>
  );
};

Post.getInitialProps = async ({ query }) => {
  // moment 모듈을 컴포넌트단에서 import 해오면 용량이 크다. => 따로 번들로 분리하는 방법
  const moment = (await import("moment")).default();
  return {
    post: posts[query.id],
    date: moment.format("dddd D MMMM YYYY"),
  };
};

export default Post;
