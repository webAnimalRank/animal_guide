import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const validateUpdateForm = (formData) => {
	if (!formData.currentPw) return { success: false, message: '현재 비밀번호를 입력해주세요.' };
	if (formData.newPw && formData.newPw !== formData.newPwConfirm) {
		return { success: false, message: '새 비밀번호가 일치하지 않습니다.' };
	}
	return { success: true };
};

export const useMyInfoStore = create((set, get) => ({
	loading: false,

	updateInfo: async (formData) => {
		const { member, setMember } = useAuthStore.getState();

		// 유효성 검사 호출
		const validation = validateUpdateForm(formData);
		if (!validation.success) return validation;

		set({ loading: true });
		try {
			const payload = {
				memberName: formData.memberName,
				memberEmail: formData.memberEmail,
				currentPw: formData.currentPw,
				...(formData.newPw && { memberPw: formData.newPw })
			};

			const res = await axios.put(`${API_URL}/api/members/${member.memberNo}`, payload);

			setMember(res.data); // 성공 시 인증 스토어 정보 갱신
			set({ loading: false });
			return { success: true };
		} catch (err) {
			set({ loading: false });
			return { success: false, message: err.response?.data?.message || '오류 발생' };
		}
	}
}));
