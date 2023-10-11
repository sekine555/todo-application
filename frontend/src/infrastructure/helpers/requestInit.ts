export const getDefaultRequestInit = (): RequestInit => {
  return {
    cache: "no-store",
    credentials: "include",
  };
};
