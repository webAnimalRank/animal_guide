// src/api/memberApi.js
import axios from 'axios';
import { data } from 'react-router-dom';

axios.defaults.withCredentials = true; // 세션 쿠키 보내는 거

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

// 로그인
export const loginMember = (data) => {
	return axios.post(`${API_URL}/api/members/login`, data);
};

// 세션 기반 로그인 정보
export const getMyInfo = () => {
	return axios.get(`${API_URL}/api/members/me`);
};

// Myinfo 수정 api
export const updateMember = (memberNo, data) => {
	return axios.put(`${API_URL}/api/members/${memberNo}`, data,
		{
			headers: {
				"Content-Type": "application/json"
			},
			withCredentials:true
		}
	);
};

// 내 투표 리스트 가져오기 (월별)
export const getMyVotes = (year, month) => {
  return axios.get(`${API_URL}/api/villagers/votes/me/list?year=${year}&month=${month}`);
};