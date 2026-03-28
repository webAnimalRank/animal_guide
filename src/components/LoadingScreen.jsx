import { Leaf1, Leaf2, Nook } from './style';

const Max = 10;

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-100 bg-(--c) flex items-center justify-center">
      <div className="w-140 rounded-2xl bg-(--c2) shadow-(--shadow) flex flex-col items-center gap-10 p-5">
        <div className="w-full px-5">
          <Nook />
        </div>
        주민들이 잠에서 깨어나는 중 . . . (최대 1분)
        <div className="flex gap-5 pt-5">
          {[...Array(Max)].map((_, i) => {
            const delay = i === Max - 1 ? '0s' : `-${(Max - 1 - i) * 0.08}s`;
            const Leaf = i % 2 === 0 ? Leaf1 : Leaf2;

            return <Leaf key={i} $delay={delay} />;
          })}
        </div>
      </div>
    </div>
  );
}
