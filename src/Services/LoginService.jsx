import axios from "axios";

const LOGIN_URL = "http://localhost:9999/lost-found/login";
const STUD_URL = "http://localhost:9999/lost-found/student";

export const registerNewUser = (user) => {
  return axios.post(LOGIN_URL, user);
};
export const validateUser = (userId, password) => {
  return axios.get(LOGIN_URL + "/" + userId + "/" + password);
};
export const getUserDetails = () => {
  return axios.get(LOGIN_URL);
};

export const getAllStudent = () => {
  return axios.get(STUD_URL);
};

export const deleteStudent = (username) =>{
  return axios.delete(STUD_URL + "/" + username);
};