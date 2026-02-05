import { useState } from 'react';
import { Wrap } from '../../components/style';
import { Fold } from './mypage.style';
import MyInfo from './MyInfo';
import MyPost from './MyPost';

export default function MyPage() {
	const [isInfo, setIsInfo] = useState(false);
	const [isPost, setIsPost] = useState(false);

	return (
		<Wrap className='px-40 pt-30 pb-20 max-xl:px-20 max-lg:px-10 max-md:px-5'>
			<Fold onClick={() => setIsInfo(!isInfo)} className={!isInfo ? 'fold' : ''}>
				<h3>내 정보</h3>
			</Fold>

			{isInfo && <MyInfo />}

			<Fold onClick={() => setIsPost(!isPost)} className={!isPost ? 'fold' : ''}>
				<h3>내 작성글</h3>
			</Fold>

			{isPost && <MyPost />}
		</Wrap>
	);
}
