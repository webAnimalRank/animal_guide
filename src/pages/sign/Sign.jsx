import { useNavigate } from 'react-router-dom';
import { Field, Btn } from '../../components/login.style';

export default function Sign() {
	const navigate = useNavigate();

	const signUp = () => {
		navigate('/login');
	};

	return (
		<>
			<h2 className='font-extrabold text-2xl'>회원 가입</h2>
			<form className='flex flex-col w-80 gap-4'>
				<Field>
					<input type='text' name='name' placeholder='별명' />
				</Field>
				<Field>
					<input type='text' name='id' placeholder='아이디' />
				</Field>
				<Field>
					<input type='password' name='pw' placeholder='비밀번호' />
				</Field>
				<Btn onClick={signUp}>회원 가입</Btn>
			</form>
		</>
	);
}
