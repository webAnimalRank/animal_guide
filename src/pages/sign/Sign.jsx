import { useNavigate } from 'react-router-dom';
import { Field, Btn, Form, Input } from '../../components/login.style';
import { useState } from 'react';
import { createMember } from '../member/memberApi';
import toast from 'react-hot-toast';

export default function Sign() {
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    pw: '',
    pwCheck: ''
  });

  const inputConfigs = [
    { name: 'name', type: 'text', label: '별명' },
    { name: 'id', type: 'text', label: '아이디' },
    { name: 'email', type: 'email', label: '이메일' },
    { name: 'pw', type: 'password', label: '비밀번호' },
    { name: 'pwCheck', type: 'password', label: '비밀번호 확인' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signUp = async (e) => {
    e.preventDefault();

    if (isLoad) return;

    const isAllFill = Object.values(formData).every((v) => v.trim() !== '');

    if (!isAllFill) {
      toast.error('모든 항목을 입력해주세요!', { id: 'empty' });
      return;
    }
    if (formData.pw !== formData.pwCheck) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoad(true);

    const newMember = {
      memberName: formData.name,
      memberId: formData.id,
      memberEmail: formData.email,
      memberPw: formData.pw
    };

    try {
      const res = await createMember(newMember);
      console.log('회원가입 완료:', res.data);
      toast.success(
        <span className='text-left'>
          회원가입이 완료되었습니다!
          <br />
          잠시 후 로그인 페이지로 이동합니다.
        </span>
      );
      setTimeout(() => {
        navigate('/login');
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
      <Form onSubmit={signUp}>
        {inputConfigs.map((c) => (
          <Field key={c.name}>
            <div className='w-full text-left'>{c.label}</div>
            <Input
              type={c.type}
              name={c.name}
              value={formData[c.name]}
              onChange={handleChange}
            />
          </Field>
        ))}
        <Btn disabled={isLoad}>회원 가입</Btn>
      </Form>
    </>
  );
}
