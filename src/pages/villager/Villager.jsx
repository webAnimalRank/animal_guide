import { Card, CardWrap, Close, List, Mini, Wrap2 } from './villager.style';
import { Glass } from '../../components/style';
import { useState } from 'react';
import { useVillagers, useVillagerDetail } from './useVillagers';

const list = ['이름', '성별', '종족', '생일', '데뷔'];

export default function Villager() {
  const { data: villagers, loading: listLoading, error: listError } = useVillagers();

  const [isSelect, setIsSelect] = useState(false);
  const [selectedNo, setSelectedNo] = useState(null);

  const {
    data: detail,
    loading: detailLoading,
    error: detailError
  } = useVillagerDetail(selectedNo, isSelect);

  const select = (villagerNo) => {
    setSelectedNo(villagerNo);
    setIsSelect(true);
  };

  const closeModal = () => {
    setIsSelect(false);
    setSelectedNo(null);
  };

  return (
    <>
      <Wrap2 className='relative'>
        <CardWrap className='pt-20 max-sm:pt-18 pb-10'>
          {listLoading && (
            <div className='w-full text-center py-10 opacity-70'>불러오는 중...</div>
          )}

          {listError && (
            <div className='w-full text-center py-10 text-red-500'>
              목록 불러오기 실패: {String(listError.message ?? listError)}
            </div>
          )}

          {!listLoading &&
            !listError &&
            villagers.map((v) => (
              <Mini key={v.villagerNo} onClick={() => select(v.villagerNo)}>
                <img src={`/images/icon_images/${v.villagerImageIcon}`} alt={v.villagerName}/>
                {v.villagerName}
              </Mini>
            ))}
        </CardWrap>

        <div className='absolute inset-6 top-10 max-sm:inset-4 bg-linear-[180deg,transparent_90%,#C4BEB1_100%] pointer-events-none' />
      </Wrap2>

      {isSelect && (
        <div
          className='fixed inset-0 bg-black/30 flex flex-col gap-8 max-sm:gap-5 items-center justify-center max-sm:pt-20'
          onClick={closeModal}
        >
          <Card onClick={(e) => e.stopPropagation()}>
            {detailLoading && (
              <div className='p-10 text-center opacity-70'>상세 불러오는 중...</div>
            )}

            {detailError && (
              <div className='p-10 text-center text-red-500'>
                상세 불러오기 실패: {String(detailError.message ?? detailError)}
              </div>
            )}

            {!detailLoading && !detailError && detail && (
              <>
                <Glass className='h-full rounded-4xl max-sm:rounded-3xl p-6 max-sm:p-4 w-max self-center'>
                  <img
                    className='h-full object-contain max-md:h-50 max-sm:h-30'
                    src={`/images/${detail.villagerImage}`}
                    alt={detail.villagerName}
                  />
                </Glass>

                <ul className='flex flex-col justify-between max-md:gap-5 max-sm:gap-3'>
                  <li className='flex gap-5 items-center text-xl max-sm:text-base'>
                    <List>{list[0]}</List>
                    {detail.villagerName}
                  </li>

                  <li className='flex gap-5 items-center text-xl max-sm:text-base'>
                    <List>{list[1]}</List>
                    {detail.villagerSex === 1 ? '남' : '여'}
                  </li>

                  <li className='flex gap-5 items-center text-xl max-sm:text-base'>
                    <List>{list[2]}</List>
                    {detail.villagerTypeName}
                  </li>

                  <li className='flex gap-5 items-center text-xl max-sm:text-base'>
                    <List>{list[3]}</List>
                    {detail.villagerBirth 
                    ? (() => { const [month, day] = detail.villagerBirth.split("-");
                      return `${Number(month)}월 ${Number(day)}일`;
                    })()
                    : ""}
                  </li>

                  <li className='flex gap-5 items-center text-xl max-sm:text-base'>
                    <List>{list[4]}</List>
                    {detail.villagerDebut}
                  </li>
                </ul>
              </>
            )}
          </Card>

          <Close onClick={closeModal}>닫기</Close>
        </div>
      )}
    </>
  );
}
