// src/api/memberApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const BASE_URL = `${API_URL}/api/members`;

export const getMemberList = () => {
  return axios.get(BASE_URL);
};

// 회원 등록
export const createMember = (member) => {
  // member: { name, id, pw }
  return axios.post(BASE_URL, member);
};
