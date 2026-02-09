import React, { useState } from 'react';
import { Wrap } from '../../components/style';
import { Fold } from './mypage.style';
import MyInfo from './MyInfo';
import MyPost from './MyPost';
import MyPick from './MyPick';

export default function MyPage() {
	const sectionData = [
		{ key: 'info', title: '내 정보', component: MyInfo },
		{ key: 'post', title: '내 작성글', component: MyPost },
		{ key: 'pick', title: '내 투표', component: MyPick }
	];
	const [sections, setSections] = useState(Object.fromEntries(sectionData.map(({ key }) => [key, false])));

	const toggleSection = (key) => {
		setSections((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	return (
		<Wrap className='px-20 max-lg:px-10 max-md:px-5 max-sm:px-2'>
			{sectionData.map(({ key, title, component: Component }) => (
				<React.Fragment key={key}>
					<Fold onClick={() => toggleSection(key)} className={!sections[key] ? 'fold' : ''}>
						<h3 className='max-sm:text-xl'>{title}</h3>
					</Fold>
					{sections[key] && <Component />}
				</React.Fragment>
			))}
		</Wrap>
	);
}
