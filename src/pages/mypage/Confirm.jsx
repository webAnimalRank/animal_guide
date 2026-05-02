import { Btn } from '../../components/style';

export default function Confirm({ change, cancel, edit }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30'>
      <div className='bg-(--cw)/80 flex flex-col gap-8 py-5 px-6 w-80 rounded-2xl backdrop-blur-xs'>
        <label className='flex flex-col gap-8 items-start'>
          현재 비밀번호를 입력해주세요.
          <input
            className='w-full bg-white/10 rounded-md p-2 font-(family-name:--f)'
            type='password'
            name='currentPw'
            onChange={change}
          />
        </label>
        <div className='flex self-end'>
          <Btn onClick={cancel}>취소</Btn>
          <Btn onClick={edit}>확인</Btn>
        </div>
      </div>
    </div>
  );
}
