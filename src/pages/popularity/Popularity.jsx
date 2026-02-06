import { useState } from 'react';
import { Wrap } from '../../components/style';
import { char } from '../../temp-data/data';
import {
  SelectBox,
  SelectWrap,
  Txt,
  CheckBox,
  Submit,
  Close,
  CheckWrap
} from './popularity.style';

export default function Popularity() {
  const [checkId, setCheckId] = useState([]);
  const MAX = 3;

  const check = (i, checked) => {
    if (checked && checkId.length === MAX) {
      return;
    }

    setCheckId((prev) =>
      checked ? [...prev, i] : prev.filter((v) => v !== i)
    );
  };

  return (
    <Wrap className="h-0! fixed max-sm:inset-0">
      <h2 className="font-bold text-2xl">5월의 인기투표</h2>
      <div className="flex-1 min-h-0 bg-(--c2) rounded-2xl relative">
        <SelectWrap>
          {char.map((v, i) => {
            const isChecked = checkId.includes(i);
            const isFull = checkId.length === MAX;
            const text = isChecked ? '선택해제' : isFull ? '선택 불가' : '선택';

            return (
              <SelectBox key={i}>
                <img
                  src={v.img}
                  alt=""
                  className="min-h-0 flex-1 object-contain"
                />
                <div className="font-extrabold whitespace-nowrap name">
                  {v.name}
                </div>
                <input
                  type="checkbox"
                  name="check"
                  className="hidden"
                  checked={checkId.includes(i)}
                  onChange={(e) => check(i, e.target.checked)}
                  disabled={!isChecked && isFull}
                />
                <Txt>{text}</Txt>
              </SelectBox>
            );
          })}
          <div className="absolute inset-0 bg-linear-[180deg,transparent_90%,rgba(0,0,0,0.2)_100%] pointer-events-none rounded-2xl" />
        </SelectWrap>
      </div>
      <div className="flex flex-0 gap-3 justify-between max-sm:flex-col sm:pt-2">
        <CheckWrap>
          {checkId.map((i) => (
            <CheckBox key={i}>
              <img
                className="object-contain min-h-0 flex-1"
                src={char[i].mini}
                alt=""
              />
              {char[i].name}
              <Close onClick={() => check(i, false)}></Close>
            </CheckBox>
          ))}
          {checkId.length !== MAX && (
            <>
              {Array.from({ length: MAX - checkId.length }).map((_, i) => (
                <CheckBox key={`empty-${i}`} className='pt-4 gap-2 empty'>
                  <div className='flex-1 aspect-square self-center border-2 border-dashed opacity-50 rounded-xl' />
                  선택 안함
                </CheckBox>
              ))}
            </>
          )}
        </CheckWrap>
        <Submit disabled={checkId.length !== MAX}>투표 완료</Submit>
      </div>
    </Wrap>
  );
}
