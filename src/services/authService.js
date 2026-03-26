import API from "./api";

export const teacherSignup = (data) =>
  API.post("/teacher/signup", data);

export const studentSignup = (data) =>
  API.post("/student/signup", data);

export const loginUser = (data) =>
  API.post("/login", data);