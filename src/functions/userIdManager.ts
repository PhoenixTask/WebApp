export const setUserId = (userId: string) => {
  localStorage.setItem("User-Id", userId);
};

export const getUserId = (): string => {
  return localStorage.getItem("User-Id")!;
};

export const removeUserId = () => {
  localStorage.removeItem("User-Id");
};
