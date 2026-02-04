import { useState } from 'react';
import { Wrap } from '../../components/style';
import { TabWrap, TabBtn } from './board.style';
import DataTable from './DataTable';
import { usePosts } from './usePosts';

export default function Board() {

  // 공지/자유 탭 상태
  const [activeTab, setActiveTab] = useState('notice');

  // ⚠️ 서버 페이징 상태 (DataTable에서 직접 바꾸지 않음)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  // 검색 상태
  const [search, setSearch] = useState('titleContent');
  const [keyword, setKeyword] = useState('');

  /**
   * 게시판 데이터 조회
   * - page / size / kind가 바뀌면 서버 재요청
   */
  const { items, meta, loading, error } = usePosts({
    kind: activeTab,
    search,
    keyword,
    page,
    size,
  });

  /**
   * 탭 변경 시
   * ⚠️ 반드시 page를 1로 초기화해야 함
   * (공지 5페이지 보다가 자유 탭 눌렀을 때 데이터 없는 문제 방지)
   */
  const changeTab = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <Wrap className="gap-5">
      <TabWrap>
        <TabBtn
          className={activeTab === 'notice' ? 'active' : ''}
          onClick={() => changeTab('notice')}
        >
          공지사항
        </TabBtn>
        <TabBtn
          className={activeTab === 'free' ? 'active' : ''}
          onClick={() => changeTab('free')}
        >
          자유 게시판
        </TabBtn>
      </TabWrap>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          data={items}
          meta={meta}
          page={page}
          setPage={setPage}
          size={size}
        />
      )}

      {error && <div style={{ color: 'crimson' }}>{error.message}</div>}
    </Wrap>
  );
}
