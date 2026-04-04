import { useEffect, useMemo, useState } from 'react';
import { Rank, ResultWrap, Title3 } from './home.style';
import { Box, Loading } from '../../components/style';
import tom from '../../assets/img/Tom_Nook_NH.png';
import crown from '../../assets/img/crown.svg';
import tomMin from '../../assets/img/tom_icon.png';
import { useLoading } from '../../store/useLoading';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Result() {
  const { startLoading, stopLoading } = useLoading.getState().actions;
  const [top3, setTop3] = useState([]);
  const month = new Date().getMonth() + 1;

  const [loadCount, setLoadCount] = useState(0);
  const [topLoad, setTopLoad] = useState(true);

  useEffect(() => {
    startLoading();
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/villagers/votes/top`);
        if (!res.ok) {
          throw new Error('랭킹 조회 실패');
        }
        const data = await res.json();
        setTop3(Array.isArray(data.top3) ? data.top3 : []);
      } catch (e) {
        console.error(e);
        setTop3([]);
      } finally {
        stopLoading();
      }
    };

    load();
  }, []);

  const rankData = useMemo(() => {
    return top3.map((v, idx) => {
      const rank = idx + 1;
      const shadow =
        rank === 1
          ? 'bg-(--gold)'
          : rank === 2
            ? 'bg-(--silver)'
            : 'bg-(--bronze)';
      return {
        rank,
        name: v.villagerName,
        votes: v.votes,
        shadow,
        icon: rank === 1 ? crown : v.villagerImageIcon || tomMin
      };
    });
  }, [top3]);

  const isAllLoad = loadCount >= rankData.length + 1;

  useEffect(() => {
    if (isAllLoad) {
      setTopLoad(false);
    }
  }, [isAllLoad]);

  return (
    <Box className="w-120 max-sm:w-full relative">
      <Title3 className="star border-(--y)">{month}월의 인기 주민</Title3>
      {topLoad && (
        <Loading className="absolute top-1/2 left-1/2 -translate-1/2 h-30" />
      )}
      {rankData.length === 0 ? (
        <ResultWrap className="load">
          <img
            className="h-60 max-md:50 object-contain"
            src={tom}
            alt=""
            onLoad={() => setLoadCount((prev) => prev + 1)}
            onError={() => setLoadCount((prev) => prev + 1)}
          />
          <div className="font-bold text-lg py-3">
            아직 투표 결과가 없습니다.
          </div>
        </ResultWrap>
      ) : (
        <ResultWrap className={!topLoad ? 'load' : ''}>
          <img
            className="h-60 max-md:50 object-contain"
            src={top3[0]?.villagerImage}
            alt="이달의 주민"
            onLoad={() => setLoadCount((prev) => prev + 1)}
            onError={() => setLoadCount((prev) => prev + 1)}
          />
          {rankData.map(({ rank, icon, name, votes, shadow }) => (
            <Rank key={rank} className={shadow}>
              <span
                className={
                  rank === 1
                    ? 'text-xl max-md:text-lg'
                    : 'text-lg max-md:text-base'
                }
              >
                {rank}위
              </span>
              <img
                className="h-10 max-md:h-8"
                src={icon}
                alt=""
                onLoad={() => setLoadCount((prev) => prev + 1)}
                onError={() => setLoadCount((prev) => prev + 1)}
              />
              <span
                className={
                  rank === 1
                    ? 'text-2xl font-extrabold'
                    : 'text-xl font-extrabold'
                }
              >
                {name}
              </span>
              <span className="ml-auto text-lg max-md:text-base font-bold">
                {votes}표
              </span>
            </Rank>
          ))}
        </ResultWrap>
      )}
    </Box>
  );
}
