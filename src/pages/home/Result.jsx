import { useEffect, useMemo, useState, useCallback } from 'react';
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
  const [loadCount, setLoadCount] = useState(0);
  const [rankLoad, setRankLoad] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const month = new Date().getMonth() + 1;

  // 1. 이미지 로드 완료/실패 핸들러 통합
  const handleImageLoad = useCallback(() => {
    setLoadCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchRanking = async () => {
      startLoading();
      try {
        const res = await fetch(`${API_URL}/api/villagers/votes/top`);
        if (!res.ok) throw new Error('랭킹 조회 실패');
        const data = await res.json();
        setTop3(Array.isArray(data.top3) ? data.top3 : []);
      } catch (e) {
        console.error(e);
        setTop3([]);
      } finally {
        stopLoading();
        setRankLoad(true);
      }
    };
    fetchRanking();
  }, [startLoading, stopLoading]);

  // 2. 랭킹 데이터 및 메인 이미지 설정 최적화
  const { rankList, mainImage, targetCount } = useMemo(() => {
    const list = top3.map((v, idx) => {
      const rank = idx + 1;
      const styles = {
        1: {
          shadow: 'bg-(--gold)',
          size: 'text-xl max-md:text-lg',
          nameSize: 'text-2xl'
        },
        2: {
          shadow: 'bg-(--silver)',
          size: 'text-lg max-md:text-base',
          nameSize: 'text-xl'
        },
        3: {
          shadow: 'bg-(--bronze)',
          size: 'text-lg max-md:text-base',
          nameSize: 'text-xl'
        }
      };

      return {
        ...v,
        rank,
        ...styles[rank],
        icon: rank === 1 ? crown : v.villagerImageIcon || tomMin
      };
    });

    return {
      rankList: list,
      mainImage: top3[0]?.villagerImage || tom,
      targetCount: list.length + 1 // 메인 이미지 1개 + 리스트 아이콘 개수
    };
  }, [top3]);

  // 3. 로딩 종료 감지
  useEffect(() => {
    if (rankLoad && loadCount < targetCount) {
      const timer = setTimeout(() => {
        if (loadCount < targetCount) {
          setIsLoad(true);
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    if (loadCount >= targetCount) {
      setIsLoad(false);
    }
  }, [rankLoad, loadCount, targetCount]);

  return (
    <Box className='w-120 max-sm:w-full relative'>
      <Title3 className='star border-(--y)'>{month}월의 인기 주민</Title3>

      {isLoad && (
        <Loading className='absolute top-1/2 left-1/2 -translate-1/2 h-30' />
      )}

      <ResultWrap
        className={rankLoad && loadCount >= targetCount ? 'load' : ''}
      >
        {/* 메인 이미지 영역 */}
        <img
          className='h-60 max-md:50 object-contain'
          src={mainImage}
          alt={top3.length > 0 ? '이달의 주민' : '데이터 없음'}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />

        {top3.length === 0 ? (
          <div className='font-bold text-lg py-3'>
            아직 투표 결과가 없습니다.
          </div>
        ) : (
          rankList.map((item) => (
            <Rank key={item.rank} className={item.shadow}>
              <span className={item.size}>{item.rank}위</span>
              <img
                className='h-10 max-md:h-8'
                src={item.icon}
                alt=''
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
              <span className={`${item.nameSize}`}>{item.villagerName}</span>
              <span className='ml-auto text-lg max-md:text-base'>
                {item.votes}표
              </span>
            </Rank>
          ))
        )}
      </ResultWrap>
    </Box>
  );
}
