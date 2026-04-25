import { Edit, EditList, Form, IconWrap, ImgIcon, Label, Select } from './mypage.style';
import { useRef, useState } from 'react';
import { useMyInfoStore } from './useMyInfoStore';
import { useFetchStore } from '../../store/useFetchStore';
import { VillagerImage } from '../villager/Villager';
import { useMyInfoForm } from './useMyInfoForm';
import Confirm from './Confirm';
import { ico } from '@cloudinary/url-gen/qualifiers/format';
import { useOutClick } from '../../components/useOutClick';

const fieldDefs = [
	{ key: 'memberName', label: '별명', type: 'text' },
	{ key: 'memberEmail', label: '이메일', type: 'email' },
	{ key: 'newPw', label: '새 비밀번호', type: 'password' },
	{ key: 'newPwConfirm', label: '새 비밀번호 확인', type: 'password' }
];

export default function MyInfo() {
	const { member, villagers, fetchMembers } = useFetchStore();
	const { updateInfo, loading } = useMyInfoStore();
	const [isIcon, setIsIcon] = useState(false);

	const dropRef = useRef(null);
	useOutClick(dropRef, () => setIsIcon(false));

	const {
		formData,
		handleChange,
		handleUpdate,
		existingVillager,
		icon,
		setIcon,
		setSelectVillager,
		isEdit,
		setIsEdit,
		isChange
	} = useMyInfoForm(member, villagers, updateInfo, fetchMembers);

	if (!member) return null;

	return (
		<div className='flex flex-col gap-4 px-20 max-lg:px-10 max-sm:px-5'>
			<Form className='relative'>
				<div
					ref={dropRef}
					className='pt-4 flex flex-col justify-center items-center self-center gap-4 font-extrabold text-2xl max-md:p-0 max-sm:text-xl'
				>
					<ImgIcon onClick={() => setIsIcon(!isIcon)}>
						{icon ? <img src={icon} alt='' /> : <div className='w-full aspect-square' />}
					</ImgIcon>
					{member.memberId}
					{isIcon && (
						<IconWrap>
							{villagers?.map((v) => (
								<Select
									key={v.villagerNo}
									onClick={() => {
										setIcon(v.villagerImageIcon);
										setSelectVillager(Number(v.villagerNo));
										setIsIcon(false);
									}}
								>
									<VillagerImage src={v.villagerImageIcon} alt={v.villagerName} />
								</Select>
							))}
						</IconWrap>
					)}
				</div>
				<EditList>
					{fieldDefs.map((field) => (
						<Label key={field.key}>
							<span>{field.label}</span>
							<div className='px-4 py-2 rounded-lg flex items-center font-semibold w-full max-sm:rounded-md bg-white/20 backdrop-blur-xs'>
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
			<Edit onClick={() => setIsEdit(true)} disabled={loading || !isChange}>
				수정
			</Edit>

			{isEdit && <Confirm change={handleChange} edit={handleUpdate} cancel={() => setIsEdit(false)} />}
		</div>
	);
}
