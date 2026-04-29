import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form } from '../../components/login.style';
import { useState } from 'react';
import { getMyInfo, loginMember } from '../member/memberApi';
import { useFetchStore } from '../../store/useFetchStore';
import toast from 'react-hot-toast';

export default function Login() {
  const { setMember } = useFetchStore();

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const logIn = async (e) => {
    e.preventDefault();
    console.log('로그인 시도 : ', { id, pw });
    try {
      const loginRes = await loginMember({ memberId: id, memberPw: pw });
      const token = loginRes.data.accessToken;

      localStorage.setItem('accessToken', token);

      const res = await getMyInfo();
      setMember(res.data);
      toast.success(`${res.data.memberName}님 환영합니다`);
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
