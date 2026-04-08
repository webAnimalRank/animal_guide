import { useNavigate } from 'react-router-dom';
import { Field, Btn, Form } from '../../components/login.style';
import { useState } from 'react';
import { createMember } from '../member/memberApi';
import toast from 'react-hot-toast';

export default function Sign() {
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const signUp = async (e) => {
    e.preventDefault(); // 폼 submit 기본 동작 방지

    if (isLoad) return;
    setIsLoad(true);

    // 입력값 검증
    if (!name.trim() || !id.trim() || !email.trim() || !pw.trim()) {
      toast.error('모든 항목을 입력해주세요!', { id: 'empty' });
      setIsLoad(false);
      return; // 빈 값 있으면 함수 종료
    }

    const newMember = {
      memberName: name,
      memberId: id,
      memberEmail: email,
      memberPw: pw
    };

    try {
      const res = await createMember(newMember);
      console.log('회원가입 완료:', res.data);
      toast.success(
        <span className="text-left">
          회원가입이 완료되었습니다!
          <br />
          잠시 후 로그인 페이지로 이동합니다.
        </span>
      );
      setTimeout(() => {
        navigate('/login'); // 성공 시 로그인 페이지 이동
        setIsLoad(false);
      }, 1500);
    } catch (err) {
      console.error('회원가입 실패:', err);
      toast.error('회원가입 실패! 다시 시도해주세요.');
      setIsLoad(false);
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
        <Btn disabled={isLoad}>회원 가입</Btn>
      </Form>
    </>
  );
}
