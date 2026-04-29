import api from '../../api/client';

const BASE_URL = '/api/members';

export const getMemberList = () => {
	return api.get(BASE_URL);
};

export const createMember = (member) => {
	return api.post(BASE_URL, member);
};

export const loginMember = (data) => {
	return api.post('/api/members/login', data);
};

export const getMyInfo = () => {
	return api.get('/api/members/me');
};

export const updateMember = (memberNo, data) => {
	return api.put(`/api/members/${memberNo}`, data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const getMyVotes = (year, month) => {
	return api.get(`/api/villagers/votes/me/list?year=${year}&month=${month}`);
};
