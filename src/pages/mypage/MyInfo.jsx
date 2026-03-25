import { Edit, EditList, Form, ImgIcon, Label, Select } from './mypage.style';
import mini from '../../assets/img/tom_icon.png';
import { useEffect, useState } from 'react';
import { useMyInfoStore } from './useMyInfoStore';
import { useFetchStore } from '../../store/useFetchStore';
import { SelectWrap } from '../popularity/popularity.style';
import { VillagerImage } from '../villager/Villager';

const fieldDefs = [
  { key: 'memberName', label: '별명', type: 'text' },
  { key: 'memberEmail', label: '이메일', type: 'email' },
  { key: 'newPw', label: '새 비밀번호', type: 'password' },
  { key: 'newPwConfirm', label: '새 비밀번호 확인', type: 'password' },
  { key: 'currentPw', label: '현재 비밀번호', type: 'password' }
];

export default function MyInfo() {
  const { member, villagers } = useFetchStore();
  const { updateInfo, loading } = useMyInfoStore();
  const [isIcon, setIsIcon] = useState(false);
  const [icon, setIcon] = useState(mini);
  const [selectedVillager, setSelectedVillager] = useState(null);

  // 사용자가 입력 중인 "임시" 데이터 상태
  const [formData, setFormData] = useState({
    memberName: '',
    memberEmail: '',
    newPw: '',
    newPwConfirm: '',
    currentPw: ''
  });

  // 초기값 세팅: member 정보가 들어오면 입력창에 넣어줌
  useEffect(() => {
    if (member) {
      setFormData((prev) => ({
        ...prev,
        memberName: member.memberName,
        memberEmail: member.memberEmail
      }));
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const result = await updateInfo({
    ...formData,
    profileVillagerNo: selectedVillager // ⭐ 추가
  });

    if (result.success) {
      alert('회원 정보가 수정되었습니다.');
      // 비밀번호 필드만 초기화
      setFormData((prev) => ({
        ...prev,
        newPw: '',
        newPwConfirm: '',
        currentPw: ''
      }));
    } else {
      alert(result.message);
    }
  };

  if (!member) return null;

  return (
    <div className="flex flex-col gap-4 px-20 max-lg:px-10 max-sm:px-5">
      <Form className="relative">
        <div className="w-40 p-4 flex flex-col justify-center items-center self-center gap-4 font-extrabold text-2xl max-md:w-25 max-md:p-0 max-sm:text-xl">
          <ImgIcon onClick={() => setIsIcon(!isIcon)}>
            <img src={icon} alt="" />
          </ImgIcon>
          {member.memberId}
        </div>
        {isIcon && (
          <SelectWrap className="absolute z-40 p-2 top-55 max-md:top-45 max-sm:top-40 bg-(--c2)">
            {villagers?.map((v) => (
              <Select
                key={v.villagerNo}
                onClick={() => {
                  setIcon(v.villagerImageIcon);
                  setSelectedVillager(v.villagerNo);
                  setIsIcon(!isIcon);
                }}
              >
                <VillagerImage src={v.villagerImageIcon} alt={v.villagerName} />
              </Select>
            ))}
          </SelectWrap>
        )}
        <EditList>
          {fieldDefs.map((field) => (
            <Label key={field.key}>
              <span>{field.label}</span>
              <div className="px-4 py-2 rounded-lg flex items-center font-semibold w-full max-sm:rounded-md bg-white/20">
                <input
                  type={field.type}
                  name={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  className="w-full font-(family-name:--f)"
                />
              </div>
            </Label>
          ))}
        </EditList>
      </Form>
      <Edit onClick={handleUpdate} disabled={loading}>
        수정
      </Edit>
    </div>
  );
}
