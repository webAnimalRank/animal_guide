// src/api/memberApi.js
import axios from "axios";

export const getMemberList = () => {
  return axios.get("http://localhost:8080/api/members");
};