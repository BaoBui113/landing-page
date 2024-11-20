import cookies from "js-cookie";

export const getCookie = (name: string) => cookies.get(name);
export const setCookie = (name: string, value: string, expires = 1) =>
  cookies.set(name, value, { expires });
export const removeCookie = (name: string) => cookies.remove(name);
