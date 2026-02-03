import { useNavigate } from 'react-router-dom';
import { Field, Btn, Btn2, Form } from '../../components/login.style';

export default function Login() {
	const navigate = useNavigate();

	const logIn = () => {
		navigate('/');
	};

	return (
		<>
			<h2 className='font-extrabold text-2xl'>로그인</h2>
			<Form>
				<Field>
					<input type='text' name='id' placeholder='아이디' />
				</Field>
				<Field>
					<input type='password' name='pw' placeholder='비밀번호' />
				</Field>
				<Btn onClick={logIn}>로그인</Btn>
				<Btn2 to='/sign'>회원 가입</Btn2>
			</Form>
		</>
	);
}
