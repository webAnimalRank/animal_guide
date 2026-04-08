import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tag } from './mypage.style';
import { Btn } from '../../components/style';
import usePostAction from '../board/usePostAction';
import { useFetchStore } from '../../store/useFetchStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { member } = useFetchStore();
  const { handleRemove } = usePostAction(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const postsRes = await axios.get(`${API_URL}/api/boards/my`, {
          withCredentials: true
        });
        setPosts(postsRes.data);
        setError('');
      } catch (err) {
        setPosts([]);
        setError('게시물을 불러오는데 실패했습니다.');
      }
    };

    fetchMyPosts();
  }, []);

  const edit = (boardNo) => navigate(`/board/edit/${boardNo}`);

  const remove = (no) => {
    handleRemove(no, () => {
      setPosts((prev) => prev.filter((p) => p.boardNo !== no));
      setError('');
    });
  };

  if (!member) {
    return <div>{error || '회원 정보를 불러오는데 실패했습니다.'}</div>;
  }

  return (
    <div className="flex flex-col gap-2 bg-white/15 rounded-xl p-3">
      {error && <div className="pb-3 text-sm text-red-300">{error}</div>}

      {posts.length === 0 ? (
        <div>게시물이 없습니다.</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.boardNo}
            className="flex items-center gap-4 pb-2 border-b font-bold text-sm"
          >
            <Tag>{post.boardKind === 'notice' ? '공지' : '자유'}</Tag>
            <Link
              to={`/board/post/${post.boardNo}`}
              className="flex-1 text-left underline-offset-4 hover:underline"
            >
              {post.boardTitle}
            </Link>
            <div>
              <Btn onClick={() => edit(post.boardNo)}>수정</Btn>
              <Btn onClick={() => remove(post.boardNo)}>삭제</Btn>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
