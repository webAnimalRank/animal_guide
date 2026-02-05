import { Glass, Scroll } from '../../components/style';
import { Edit, EditList, Form, Label } from './mypage.style';
import mini from '../../assets/img/tom_icon.png';

const data = [
	{ label: '별명', type: 'text', value: '별명' },
	{ label: '이메일', type: 'email', value: 'abcd@email' },
	{ label: '비밀번호', type: 'password' },
	{ label: '비밀번호 확인', type: 'password' }
];

export default function MyInfo() {
	return (
		<Scroll className='flex flex-col gap-4 px-20 max-lg:px-10 max-sm:px-5'>
			<Form>
				<div className='flex flex-col justify-center items-center self-center gap-4 font-extrabold text-2xl max-md:w-25 max-sm:text-xl'>
					<Glass className='rounded-full p-2'>
						<img src={mini} alt='' />
					</Glass>
					id
				</div>
				<EditList>
					{data.map((d) => (
						<Label key={d.label}>
							<span>{d.label}</span>
							<Glass className='px-4 py-2 rounded-xl flex items-center font-semibold w-full'>
								<input type={d.type} defaultValue={d.value} className='w-full font-(family-name:--f)' />
							</Glass>
						</Label>
					))}
				</EditList>
			</Form>
			<Edit>수정</Edit>
		</Scroll>
	);
}
