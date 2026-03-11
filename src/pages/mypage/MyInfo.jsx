import { Glass } from '../../components/style';
import { Edit, EditList, Form, Label } from './mypage.style';
import mini from '../../assets/img/tom_icon.png';
import { useEffect, useState } from 'react';
import { getMyInfo, updateMember } from '../member/memberApi';

export default function MyInfo({ member, setMember }) {
	// const [member, setMember] = useState(null); -> 전역관리로 바꿈
	const [data, setData] = useState([
		{ label: '별명', type: 'text', value: '' },
		{ label: '이메일', type: 'email', value: '' },
		{ label: '새 비밀번호', type: 'password', value: '' },
		{ label: '새 비밀번호 확인', type: 'password', value: '' },
		{ label: '내 비밀번호', type: 'password', value: '' }
  	]);

  useEffect(() => {
    if (member) {
			setData([
				{ label: '별명', type: 'text', value: member.memberName },
				{ label: '이메일', type: 'email', value: member.memberEmail },
				{ label: '새 비밀번호', type: 'password', value: '' },
				{ label: '새 비밀번호 확인', type: 'password', value: '' },
        { label: '내 비밀번호', type: 'password', value: '' }
			]);
		}
  }, [member]);

  if (!member) return <div>회원정보 찾을 수 없음</div>;

  const handleChange = (index, value) => {
    const newData = [...data];
    newData[index].value = value;
    setData(newData);
  };

  const handleUpdate = () => {
    // 새 비밀번호 확인
    if (data[2].value !== data[3].value) {
      alert("새 비밀번호가 새 비밀번호 확인과 일치하지 않습니다");
      return;
    }
    // 기존 비밀번호 입력 체크
    if (!data[4].value) {
      alert("기존 비밀번호를 입력해주세요");
      return;
    }
  
    const updateData = {
      memberName: data[0].value,
      memberEmail: data[1].value,
      currentPw: data[4].value // 기존 비밀번호 항상 전달
    };

    // 새 비밀번호 있을때만 추가
    if(data[2].value){
      updateData.memberPw = data[2].value;
    }

    updateMember(member.memberNo, updateData)
      .then((res) => {
        // const newMember = {
        //   ...member,
        //   memberName: data[0].value,
        //   memberEmail: data[1].value
        // };
        // setMember(newMember);

        setMember(res.data);

        // input 초기화
        setData([
          { label: '별명', type: 'text', value: res.data.memberName },
          { label: '이메일', type: 'email', value: res.data.memberEmail },
          { label: '새 비밀번호', type: 'password', value: '' },
          { label: '새 비밀번호 확인', type: 'password', value: '' },
          { label: '내 비밀번호', type: 'password', value: '' }
        ]);

        // setData([
        //   { label: '별명', type: 'text', value: newMember.memberName },
        //   { label: '이메일', type: 'email', value: newMember.memberEmail },
        //   { label: '새 비밀번호', type: 'password', value: '' },
        //   { label: '새 비밀번호 확인', type: 'password', value: '' },
        //   { label: '내 비밀번호', type: 'password', value: '' }
        // ]);

        alert("회원정보 수정 완료");
      })
      .catch((err) => {
        console.log(err.response.data.message); // 서버 에러 확인
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("수정 실패");
        }
      });

      
  };

	return (
		<div className='flex flex-col gap-4 px-20 max-lg:px-10 max-sm:px-5'>
			<Form>
				<div className='w-40 p-4 flex flex-col justify-center items-center self-center gap-4 font-extrabold text-2xl max-md:w-25 max-md:p-0 max-sm:text-xl'>
					<Glass className='rounded-full p-2'>
						<img src={mini} alt='' />
					</Glass>
					{member.memberId}
				</div>
				<EditList>
					{data.map((d, i) => (
						<Label key={d.label}>
							<span>{d.label}</span>
							<div className='px-4 py-2 rounded-xl flex items-center font-semibold w-full max-sm:rounded-lg bg-white/20'>
								<input
                  type={d.type}
                  value={d.value}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className='w-full font-(family-name:--f)'
                />
							</div>
						</Label>
					))}
				</EditList>
			</Form>
			<Edit onClick={handleUpdate}>수정</Edit>
		</div>
	);
}
