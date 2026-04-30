import React, { useState } from 'react';
import { Btn, Wrap } from '../../components/style';
import { Fold, Logout } from './mypage.style';
import MyInfo from './MyInfo';
import MyPost from './MyPost';
import MyPick from './MyPick';
import { useFetchStore } from '../../store/useFetchStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function MyPage() {
	const { member, logout } = useFetchStore();
	const navigate = useNavigate();

	const sectionData = [
		{ key: 'info', title: '내 정보', component: MyInfo },
		{ key: 'pick', title: '내 투표', component: MyPick },
		{ key: 'post', title: '내 작성글', component: MyPost }
	];
	const [sections, setSections] = useState(Object.fromEntries(sectionData.map(({ key }) => [key, false])));

	const toggleSection = (key) => {
		setSections((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	const handleLogout = async () => {
		navigate('/', { replace: true });
		const result = await logout();

		if (result.success) {
			toast.success('로그아웃되었습니다.');
		} else {
			toast.error('로그아웃 실패');
		}
	};

	if (!member) return <p>로그인이 필요합니다.</p>;

	return (
		<Wrap className='px-20 max-lg:px-10 max-md:px-5 max-sm:px-2'>
			{sectionData.map(({ key, title, component: Component }) => (
				<div key={key} className='w-full flex flex-col gap-5 bg-(--cw)/60 p-4 rounded-xl'>
					<Fold onClick={() => toggleSection(key)} className={!sections[key] ? 'fold' : ''}>
						<h3 className='max-sm:text-xl'>{title}</h3>
					</Fold>
					{sections[key] && <Component />}
				</div>
			))}
			<Logout onClick={handleLogout}>로그아웃</Logout>
		</Wrap>
	);
}
