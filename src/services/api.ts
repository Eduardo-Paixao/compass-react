import axios from "axios";

export const apiUsers = axios.create({
  baseURL: "https://api.github.com/users/",
});
export const apiGitHub = axios.create({
  baseURL: "https://api.github.com/",
});
