export const setAccessToken = (token: string) => {
  localStorage.setItem("Access-Token", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("Access-Token");
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("Refresh-Token", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("Refresh-Token");
};

export const setUserId = (userId: string) => {
  localStorage.setItem("User-Id", userId);
};

export const getUserId = () => {
  return localStorage.getItem("User-Id");
};

export const removeTokens = () => {
  localStorage.removeItem("User-Id");
  localStorage.removeItem("Access-Token");
  localStorage.removeItem("Refresh-Token");
};