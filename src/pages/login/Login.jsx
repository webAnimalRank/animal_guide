import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form } from '../../components/login.style';
import { useState } from 'react';
import { loginMember } from '../member/memberApi';

export default function Login({ setMember }) {
	const navigate = useNavigate();
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const logIn = async (e) => {
		e.preventDefault();
		console.log('로그인 시도 : ', { id, pw });
			try {
				const res = await loginMember({ memberId: id, memberPw: pw });
				// 로그인 성공 시 App 전역 member 상태 업데이트
				setMember(res.data); // 중요! App.jsx의 member가 업데이트됨
				alert('로그인 성공!');
				navigate('/');
			} catch (err) {
				console.error('로그인 실패:', err);
				alert('로그인 실패');
			}
	};

	return (
		<>
			<h2 className='font-extrabold text-2xl'>로그인</h2>
			<Form onSubmit={logIn}>
				<Field>
					<input type='text' name='id' placeholder='아이디' value={id} onChange={(e) => setId(e.target.value)} />
				</Field>
				<Field>
					<input type='password' name='pw' placeholder='비밀번호' value={pw} onChange={(e) => setPw(e.target.value)} />
				</Field>
				<Btn>로그인</Btn>
				<Btn2 to='/sign'>회원 가입</Btn2>
			</Form>
		</>
	);
}
