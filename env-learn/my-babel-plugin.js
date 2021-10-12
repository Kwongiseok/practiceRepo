module.exports = function myBabelPlugin() {
  return {
    visitor: {
      VariableDeclaration(path) {
        // 변수를 선언할 때
        console.log("VariableDeclaration() kind:", path.node.kind);

        // 변환 코드
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
