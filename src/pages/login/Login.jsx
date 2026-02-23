import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form } from '../../components/login.style';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const logIn = async (e) => {
		e.preventDefault();
		console.log('로그인 시도 : ',{id, pw});
		console.log("🔥 API_URL:", import.meta.env.VITE_API_BASE_URL);
		try {
			await axios.post('http://localhost:8080/api/members/login', {
				memberId: id,
				memberPw: pw
			});
			console.log("로그인 성공!");
			alert('로그인 성공!');
			navigate('/'); // 로그인 후 홈 이동
		} catch (err) {
			console.error('로그인 실패:', err);
			alert('아이디 또는 비밀번호가 틀렸습니다.');
		}
		};

	return (
		<>
			<h2 className='font-extrabold text-2xl'>로그인</h2>
			<Form onSubmit={logIn}>
				<Field>
					<input type='text' name='id' placeholder='아이디' 
					value={id} onChange={e => setId(e.target.value)}/>
				</Field>
				<Field>
					<input type='password' name='pw' placeholder='비밀번호'
					value={pw} onChange={e => setPw(e.target.value)} />
				</Field>
				<Btn>로그인</Btn>
				<Btn2 to='/sign'>회원 가입</Btn2>
			</Form>
		</>
	);
}
