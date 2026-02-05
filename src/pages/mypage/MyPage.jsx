import React, { useState } from 'react';
import { Scroll, Wrap2 } from '../../components/style';
import { Fold } from './mypage.style';
import MyInfo from './MyInfo';
import MyPost from './MyPost';

export default function MyPage() {
	const [sections, setSections] = useState({
		info: false,
		post: false
	});

	const toggleSection = (key) => {
		setSections((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	const sectionData = [
		{ key: 'info', title: '내 정보', component: MyInfo },
		{ key: 'post', title: '내 작성글', component: MyPost }
	];

	return (
		<Wrap2>
			<Scroll className='py-20 px-20 max-lg:px-10 max-md:px-2 flex flex-col gap-4'>
				{sectionData.map(({ key, title, component: Component }) => (
					<React.Fragment key={key}>
						<Fold onClick={() => toggleSection(key)} className={!sections[key] ? 'fold' : ''}>
							<h3 className='max-sm:text-xl'>{title}</h3>
						</Fold>
						{sections[key] && <Component />}
					</React.Fragment>
				))}
			</Scroll>
		</Wrap2>
	);
}
