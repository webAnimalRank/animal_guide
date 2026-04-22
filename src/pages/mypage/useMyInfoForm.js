import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import tom from '../../assets/img/tom_icon.png';

export function useMyInfoForm(member, villagers, updateInfo, fetchMembers) {
	const [formData, setFormData] = useState({
		memberName: '',
		memberEmail: '',
		newPw: '',
		newPwConfirm: '',
		currentPw: ''
	});
	const [selectVillager, setSelectVillager] = useState(null);
	const [icon, setIcon] = useState(null);
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		if (!member || !villagers?.length) return;

		setFormData((prev) => ({
			...prev,
			memberName: member.memberName,
			memberEmail: member.memberEmail
		}));

		const existingVillager = villagers?.find((v) => v.villagerNo === member.profileVillagerNo);

		if (existingVillager) {
			setIcon(existingVillager.villagerImageIcon);
			setSelectVillager(existingVillager.villagerNo);
		} else {
			setIcon(tom);
		}
	}, [member, villagers]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		if (!formData.currentPw) {
			toast.error('현재 비밀번호를 입력해주세요.');
			return false;
		}
		if (formData.newPw && formData.newPw !== formData.newPwConfirm) {
			toast.error('새 비밀번호가 일치하지 않습니다.');
			return false;
		}
		return true;
	};

	const handleUpdate = async () => {
		if (!validate()) return;

		const payload = {
			memberName: formData.memberName,
			memberEmail: formData.memberEmail,
			currentPw: formData.currentPw,
			profileVillagerNo: selectVillager,
			memberPw: formData.newPw?.trim() || null
		};

		const result = await updateInfo(member.memberNo, payload);

		if (result.success) {
			toast.success('회원 정보가 수정되었습니다.');
			setFormData((prev) => ({
				...prev,
				newPw: '',
				newPwConfirm: '',
				currentPw: ''
			}));
			await fetchMembers();
			setIsEdit(false);
		} else {
			toast.error(result.message);
		}
	};

	const isChange =
		formData.memberName !== member?.memberName ||
		formData.memberEmail !== member?.memberEmail ||
		formData.newPw !== '' ||
		selectVillager !== member?.profileVillagerNo;

	return {
		formData,
		handleChange,
		icon,
		setIcon,
		setSelectVillager,
		isEdit,
		setIsEdit,
		handleUpdate,
		isChange
	};
}
