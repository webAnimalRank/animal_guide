import { Edit, EditList, Form, ImgIcon, Label, Select } from './mypage.style';
import mini from '../../assets/img/tom_icon.png';
import { useEffect, useState } from 'react';
import { useMyInfoStore } from './useMyInfoStore';
import { useFetchStore } from '../../store/useFetchStore';
import { SelectWrap } from '../popularity/popularity.style';
import { VillagerImage } from '../villager/Villager';
import toast from 'react-hot-toast';

const fieldDefs = [
	{ key: 'memberName', label: '별명', type: 'text' },
	{ key: 'memberEmail', label: '이메일', type: 'email' },
	{ key: 'newPw', label: '새 비밀번호', type: 'password' },
	{ key: 'newPwConfirm', label: '새 비밀번호 확인', type: 'password' },
	{ key: 'currentPw', label: '현재 비밀번호', type: 'password' }
];

export default function MyInfo() {
	const { member, villagers, fetchMembers } = useFetchStore();
	const { updateInfo, loading } = useMyInfoStore();
	const [isIcon, setIsIcon] = useState(false);
	const [icon, setIcon] = useState(mini);
	const [selectedVillager, setSelectedVillager] = useState(null);

	// 사용자가 입력 중인 "임시" 폼 상태
	const [formData, setFormData] = useState({
		memberName: '',
		memberEmail: '',
		newPw: '',
		newPwConfirm: '',
		currentPw: ''
	});

	// 초기값 세팅: member 정보가 들어오면 입력창에 넣어줌
	useEffect(() => {
		if (!member || !villagers?.length) return;

		setFormData((prev) => ({
			...prev,
			memberName: member.memberName,
			memberEmail: member.memberEmail
		}));

		// 🔥 이미 선택된 경우 초기화 안 함
		if (selectedVillager !== null) return;

		if (villagers?.length && selectedVillager === null) {
			// DB에 들어있는 profileVillagerNo 기준으로 아이콘 세팅
			const existingVillager = villagers.find((v) => v.villagerNo === member.profileVillagerNo);

			if (existingVillager) {
				setIcon(existingVillager.villagerImageIcon);
				setSelectedVillager(existingVillager.villagerNo);
			}
		}
	}, [member]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleUpdate = async () => {
		// 숫자로 변환, null 체크
		const villagerNoToSend = selectedVillager !== null ? Number(selectedVillager) : null;

		const payload = {
			memberName: formData.memberName,
			memberEmail: formData.memberEmail,
			currentPw: formData.currentPw,
			// memberPw: formData.newPw || undefined, // 새 비밀번호 없으면 undefined
			// memberPw: formData.newPw && formData.newPw.trim() !== '' ? formData.newPw : null,
			memberPw: formData.newPw?.trim() ? formData.newPw : null,
			profileVillagerNo: villagerNoToSend
		};

		console.log('✅ 수정 요청 payload:', JSON.stringify(payload)); // json 직렬화로 확인

		const result = await updateInfo({
			...formData,
			profileVillagerNo: selectedVillager
		});

		if (result.success) {
			toast.success('회원 정보가 수정되었습니다.');
			// 비밀번호 필드만 초기화
			setFormData((prev) => ({
				...prev,
				newPw: '',
				newPwConfirm: '',
				currentPw: ''
			}));

			// 프사 상태 업데이트
			const updatedIcon = villagers.find((v) => v.villagerNo === villagerNoToSend)?.villagerImageIcon || mini;
			setIcon(updatedIcon);
			await fetchMembers();
		} else {
			toast.error(result.message);
		}
	};

	if (!member) return null;

	return (
		<div className='flex flex-col gap-4 px-20 max-lg:px-10 max-sm:px-5'>
			<Form className='relative'>
				<div className='w-40 p-4 flex flex-col justify-center items-center self-center gap-4 font-extrabold text-2xl max-md:w-25 max-md:p-0 max-sm:text-xl'>
					<ImgIcon onClick={() => setIsIcon(!isIcon)}>
						<img src={icon} alt='' />
					</ImgIcon>
					{member.memberId}
				</div>
				{isIcon && (
					<SelectWrap className='absolute z-40 p-2 top-55 max-md:top-45 max-sm:top-40 bg-(--c2)'>
						{villagers?.map((v) => (
							<Select
								key={v.villagerNo}
								onClick={() => {
									setIcon(v.villagerImageIcon);
									setSelectedVillager(Number(v.villagerNo));
									setIsIcon(!isIcon);
								}}
							>
								<VillagerImage src={v.villagerImageIcon} alt={v.villagerName} />
							</Select>
						))}
					</SelectWrap>
				)}
				<EditList>
					{fieldDefs.map((field) => (
						<Label key={field.key}>
							<span>{field.label}</span>
							<div className='px-4 py-2 rounded-lg flex items-center font-semibold w-full max-sm:rounded-md bg-white/20'>
								<input
									type={field.type}
									name={field.key}
									value={formData[field.key] || ''}
									onChange={handleChange}
									className='w-full font-(family-name:--f)'
								/>
							</div>
						</Label>
					))}
				</EditList>
			</Form>
			<Edit onClick={handleUpdate} disabled={loading}>
				수정
			</Edit>
		</div>
	);
}
