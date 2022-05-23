module.exports.getAuthHeader = () => {
  return {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("bestmovies-token"),
    },
  };
};
