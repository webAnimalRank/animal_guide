import { Btn, Wrap } from '../../components/style';
import { Undo } from './board.style';

export default function Write() {
  return (
    <Wrap className="font-(family-name:--f)">
      <div className="flex font-medium">
        <Undo>목록</Undo>
      </div>

      <input
        type="text"
        className="bg-white/10 rounded-md py-2 px-4 text-left font-semibold"
        placeholder="제목을 입력하세요."
      />
      <textarea
        placeholder="내용을 입력하세요."
        className="bg-white/10 rounded-2xl min-h-0 flex-1 p-4 text-left whitespace-pre-wrap resize-none"
      />

      <Btn type='button' className='self-end'>작성 완료</Btn>
    </Wrap>
  );
}
