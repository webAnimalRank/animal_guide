import { useEffect, useState } from 'react';
import { Leaf1, Leaf2, LoadingWrap, Nook } from './style';

const Max = 10;

export default function LoadingScreen({ isLoading }) {
  const [render, setRender] = useState(true);
  const [isFade, setIsFade] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setRender(true);
      setIsFade(false);
    } else {
      setIsFade(true);
      const timer = setTimeout(() => {
        setRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!render && !isLoading) return null;

  return (
    <LoadingWrap $isFade={isFade}>
      <div className="w-140 max-sm:w-[85%] rounded-2xl bg-(--c2) shadow-(--shadow) flex flex-col items-center gap-10 p-5 overflow-hidden">
        <div className="w-full px-5">
          <Nook />
        </div>
        주민들이 잠에서 깨어나는 중 . . . (최대 1분)
        <div className="flex gap-5 max-sm:gap-3 pt-5">
          {[...Array(Max)].map((_, i) => {
            const delay = i === Max - 1 ? '0s' : `-${(Max - 1 - i) * 0.08}s`;
            const Leaf = i % 2 === 0 ? Leaf1 : Leaf2;

            return <Leaf key={i} $delay={delay} />;
          })}
        </div>
      </div>
    </LoadingWrap>
  );
}
