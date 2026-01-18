import { useState } from 'react';
import { Wrap } from '../../components/style';
import { TabWrap, TabBtn } from './board.style';
import DataTable from './DataTable';
import { usePosts } from './usePosts';

export default function Board() {
	const [ activeTab, setActiveTab ] = useState('notice');
	const { data, loading } = usePosts();

	return (
		<div className='h-full pt-20'>
			<Wrap>
				<TabWrap>
					<TabBtn className={activeTab === 'notice' ? 'active' : ''} onClick={() => setActiveTab('notice')}>
						공지사항
					</TabBtn>
					<TabBtn className={activeTab === 'free' ? 'active' : ''} onClick={() => setActiveTab('free')}>
						자유 게시판
					</TabBtn>
				</TabWrap>

				{loading ? <div>Loading...</div> : <DataTable data={data} />}
			</Wrap>
		</div>
	);
}
