import { useEffect } from 'react';
import tom from '../../assets/img/tom_icon.png';
import { Loading } from '../../components/style';
import { usePopularityStore } from './useStore';
import { VillagerImage } from '../villager/Villager';

export default function Rank() {
  const { ranking, rankingMonth, rankingLoading, rankingError, fetchRanking } =
    usePopularityStore();

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  return (
    <div className='w-full min-h-0 flex-1 flex gap-4 flex-col items-center'>
      <h2 className='font-bold text-xl self-start'>
        {rankingMonth ? `${rankingMonth} 투표 현황` : '이번 달 투표 현황'}
      </h2>
      <div className='w-full min-h-0 flex-1 bg-white/20 rounded-xl overflow-hidden'>
        <div className='h-full overflow-y-scroll'>
          <table className='relative w-full backdrop-blur-xs'>
            <thead className='sticky top-0 z-10 bg-(--cw)'>
              <tr>
                <th className='w-20'>순위</th>
                <th className='w-30 p-2'>이미지</th>
                <th className='w-50'>이름</th>
                <th className='w-20'>표</th>
              </tr>
            </thead>
            <tbody>
              {rankingLoading && (
                <tr>
                  <td colSpan='4' className='p-8 text-center'>
                    <div className='flex justify-center'>
                      <Loading className='size-10' />
                    </div>
                  </td>
                </tr>
              )}
              {!rankingLoading && rankingError && (
                <tr>
                  <td colSpan='4' className='p-6 text-red-500'>
                    투표 현황을 불러오지 못했습니다.
                  </td>
                </tr>
              )}
              {!rankingLoading && !rankingError && ranking.length === 0 && (
                <tr>
                  <td colSpan='4' className='p-6'>
                    아직 집계된 투표가 없습니다.
                  </td>
                </tr>
              )}
              {!rankingLoading &&
                !rankingError &&
                ranking.map((item) => (
                  <tr
                    key={item.villagerNo}
                    className='border-b-2 border-white/20'
                  >
                    <td className='text-center'>{item.rank}</td>
                    <td className='p-4'>
                      <VillagerImage
                        src={item.villagerImageIcon || tom}
                        alt={item.villagerName}
                        className='w-20 mx-auto max-sm:w-15'
                      />
                    </td>
                    <td className='text-center'>{item.villagerName}</td>
                    <td className='text-center'>{item.votes}표</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
