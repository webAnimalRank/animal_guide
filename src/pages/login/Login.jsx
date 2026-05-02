import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form, Input } from '../../components/login.style';
import { useState } from 'react';
import { getMyInfo, loginMember } from '../member/memberApi';
import { useFetchStore } from '../../store/useFetchStore';
import toast from 'react-hot-toast';

export default function Login() {
  const { setMember } = useFetchStore();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: '', pw: '' });

  const inputConfigs = [
    { name: 'id', type: 'text', label: '아이디' },
    { name: 'pw', type: 'password', label: '비밀번호' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const logIn = async (e) => {
    e.preventDefault();
    console.log('로그인 시도 : ', formData);
    try {
      const loginRes = await loginMember({
        memberId: formData.id,
        memberPw: formData.pw
      });
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
      <Form onSubmit={logIn} className='pt-10'>
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
        <Btn>로그인</Btn>
        <Btn2 to='/sign'>회원 가입</Btn2>
      </Form>
    </>
  );
}
