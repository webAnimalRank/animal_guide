import { useNavigate } from 'react-router-dom';
import { Field, Btn, Form } from '../../components/login.style';
import { useState } from 'react';
import { createMember } from '../member/memberApi';

export default function Sign() {
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const signUp = async (e) => {
    e.preventDefault(); // 폼 submit 기본 동작 방지
    console.log('signUp 함수 실행');

    const newMember = {
      memberName: name,
      memberId: id,
      memberEmail: email,
      memberPw: pw
    };

    try {
      const res = await createMember(newMember);
      console.log('회원가입 완료:', res.data);
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/login'); // 성공 시 로그인 페이지 이동
    } catch (err) {
      console.error('회원가입 실패:', err);
      alert('회원가입 실패! 다시 시도해주세요.');
    }
  };

  return (
    <>
      <h2 className="font-extrabold text-2xl">회원 가입</h2>
      <Form onSubmit={signUp}>
        <Field>
          <input
            type="text"
            name="name"
            placeholder="별명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
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
            type="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <Btn>회원 가입</Btn>
      </Form>
    </>
  );
}
