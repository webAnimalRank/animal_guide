import { useEffect } from 'react';
import tom from '../../assets/img/tom_icon.png';
import { Loading } from '../../components/style';
import { usePopularityStore } from './useStore';

export default function Rank() {
  const { ranking, rankingMonth, rankingLoading, rankingError, fetchRanking } =
    usePopularityStore();

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  return (
    <div className='w-full'>
      <div className='font-bold text-xl mb-4'>
        {rankingMonth ? `${rankingMonth} 투표 현황` : '이번 달 투표 현황'}
      </div>
      <table className='bg-white/10 w-full'>
        <thead>
          <tr>
            <th>순위</th>
            <th className='w-30 p-4'>이미지</th>
            <th>이름</th>
            <th>표</th>
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
              <td colSpan='4' className='p-6 text-center text-red-500 font-bold'>
                투표 현황을 불러오지 못했습니다.
              </td>
            </tr>
          )}
          {!rankingLoading && !rankingError && ranking.length === 0 && (
            <tr>
              <td colSpan='4' className='p-6 text-center font-bold'>
                아직 집계된 투표가 없습니다.
              </td>
            </tr>
          )}
          {!rankingLoading &&
            !rankingError &&
            ranking.map((item) => (
              <tr key={item.villagerNo}>
                <td className='text-center'>{item.rank}</td>
                <td className='p-4'>
                  <img
                    className='w-30 mx-auto'
                    src={item.villagerImage || item.villagerImageIcon || tom}
                    alt={item.villagerName}
                  />
                </td>
                <td className='text-center'>{item.villagerName}</td>
                <td className='text-center'>{item.votes}표</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
