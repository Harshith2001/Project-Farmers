import { API_LOCAL_URL_ADDR } from "../api/bin/www.js";

export function apiAddr(to) {
  return `${API_LOCAL_URL_ADDR}${to}`;
}
export const getRand = (till = 10) => Math.floor(Math.random() * till);
