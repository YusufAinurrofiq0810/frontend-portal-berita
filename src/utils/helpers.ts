export const getUserToken = () => {
  let userToken = null;

  if (typeof window !== "undefined") {
    userToken = localStorage.getItem("bearer-token");
  }

  if (userToken !== null) {
    return userToken;
  }

  return null;
};
