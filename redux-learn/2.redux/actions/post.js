const addPost = (data) => {
  return {
    type: "ADD__POST",
    data,
  };
};

module.exports = {
  addPost,
};
