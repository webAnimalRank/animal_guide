import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Tag } from './mypage.style';
import { Btn } from '../../components/style';
import usePostAction from '../board/usePostAction';
import { useFetchStore } from '../../store/useFetchStore';

export default function MyPost() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { member } = useFetchStore();
  const { handleRemove } = usePostAction(null);
  const [isToast, setIsToast] = useState(false);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const postsRes = await api.get('/api/boards/my');
        setPosts(postsRes.data);
        setError('');
      } catch (err) {
        setPosts([]);
        setError('게시물을 불러오는데 실패했습니다.');
      }
    };

    fetchMyPosts();
  }, []);

  const remove = (no) => {
    setIsToast(true);

    handleRemove(
      no,
      () => {
        setPosts((prev) => prev.filter((p) => p.boardNo !== no));
        setError('');
        setIsToast(false);
      },
      () => setIsToast(false)
    );
  };

  if (!member) {
    return <div>{error || '회원 정보를 불러오는데 실패했습니다.'}</div>;
  }

  return (
    <div className='flex flex-col gap-2 bg-white/15 rounded-xl p-3 backdrop-blur-xs'>
      {error && <div className='pb-3 text-sm text-red-300'>{error}</div>}

      {posts.length === 0 ? (
        <div>게시물이 없습니다.</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.boardNo}
            className='flex items-center gap-4 pb-2 border-b font-bold text-sm'
          >
            <Tag>{post.boardKind === 'notice' ? '공지' : '자유'}</Tag>
            <Link
              to={`/board/post/${post.boardNo}`}
              state={{ boardKind: post.boardKind }}
              className='flex-1 text-left underline-offset-4 hover:underline'
            >
              {post.boardTitle}
            </Link>
            <div>
              <Btn
                as={Link}
                className='inline-block'
                to={`/board/edit/${post.boardNo}`}
                onClick={(e) => {
                  if (isToast) {
                    e.preventDefault();
                  }
                }}
              >
                수정
              </Btn>
              <Btn disabled={isToast} onClick={() => remove(post.boardNo)}>
                삭제
              </Btn>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
