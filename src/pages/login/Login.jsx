import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form } from '../../components/login.style';
import { useState } from 'react';
import { loginMember } from '../member/memberApi';
import axios from 'axios';
import { useFetchStore } from '../../store/useFetchStore';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const { setMember } = useFetchStore();

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const logIn = async (e) => {
    e.preventDefault();
    console.log('로그인 시도 : ', { id, pw });
    try {
    // 1. 로그인 요청 (백엔드에서 토큰을 리턴해줘야 함)
    const loginRes = await loginMember({ memberId: id, memberPw: pw });
    const token = loginRes.data.accessToken; // 백엔드 응답 구조에 맞게 수정

    // 2. 토큰 저장
    localStorage.setItem('accessToken', token);

    // 3. 사용자 정보 가져오기 (헤더에 토큰 포함)
    const res = await axios.get(`${API_URL}/api/members/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    setMember(res.data);
    toast.success(`${res.data.memberName}님 환영합니다!`);
    navigate('/');
  } catch (err) {
      console.error('로그인 실패:', err);
      toast.error('아이디 혹은 비밀번호를 확인해주세요.', { id: 'loginErr' });
    }
  };

  return (
    <>
      <h2 className="font-extrabold text-2xl">로그인</h2>
      <Form onSubmit={logIn}>
        <Field>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Field>
        <Field>
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </Field>
        <Btn>로그인</Btn>
        <Btn2 to="/sign">회원 가입</Btn2>
      </Form>
    </>
  );
}
