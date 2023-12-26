import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = localStorage.getItem("access_token")
  ? true
  : false;

export const logOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("visiting_details");
  localStorage.removeItem("drink_details");
  localStorage.removeItem("visitor_details");
  window.location.href = "/login";
};
