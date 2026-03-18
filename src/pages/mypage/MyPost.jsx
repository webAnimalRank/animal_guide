import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getMyInfo } from '../member/memberApi';
import { Tag } from './mypage.style';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [member, setMember] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setMember(res.data);

        return axios.get(`${API_URL}/api/boards/my`, {
          withCredentials: true
        });
      })
      .then((res) => {
        setPosts(res.data);
        setError('');
      })
      .catch(() => {
        setPosts([]);
        setMember(null);
        setError('게시물을 불러오는데 실패했습니다.');
      });
  }, []);

  const edit = (boardNo) => {
    navigate(`/board/edit/${boardNo}`);
  };

  const remove = async (boardNo) => {
    const confirmed = window.confirm('이 게시물을 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/boards/${boardNo}`, {
        withCredentials: true
      });

      setPosts((prev) => prev.filter((post) => post.boardNo !== boardNo));
      setError('');
    } catch (err) {
      setError('게시물을 삭제하는 데 실패했습니다.');
    }
  };

  if (!member) {
    return <div>{error || '회원 정보를 불러오는데 실패했습니다.'}</div>;
  }

  return (
    <div className="flex flex-col">
      {error && <div className="pb-3 text-sm text-red-300">{error}</div>}

      {posts.length === 0 ? (
        <div>게시물이 없습니다.</div>
      ) : (
        posts.map((post) => (
          <div key={post.boardNo} className="flex items-center gap-4 pr-2 border-b py-3 font-bold text-sm">
            <Tag>{post.boardKind || 'free'}</Tag>
            <Link to={`/board/post/${post.boardNo}`} className="flex-1 text-left underline-offset-4 hover:underline">
              {post.boardTitle}
            </Link>
            <button type="button" onClick={() => edit(post.boardNo)} className="hover:font-extrabold">
              수정하기
            </button>
            <button type="button" onClick={() => remove(post.boardNo)} className="hover:font-extrabold">
              삭제하기
            </button>
          </div>
        ))
      )}
    </div>
  );
}
