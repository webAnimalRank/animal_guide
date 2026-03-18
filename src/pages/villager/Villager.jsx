import { useEffect, useState } from 'react';
import { Loading, Wrap } from '../../components/style';
import { CardWrap, Mini } from './villager.style';
import VillagerFilter from './VillagerFilter';
import VillagerDetail from './VillagerDetail';
import { useVillagerStore } from './useStore';
import { useFetchStore } from '../../store/useFetchStore';

export function VillagerImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!loaded && !error && <Loading className="absolute size-18" />}
      <img
        className={loaded ? 'load' : ''}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading='lazy'
      />
      {error && <span className="text-xs text-red-500">이미지 로드 실패</span>}
    </div>
  );
}

export default function Villager() {
  const [selectedNo, setSelectedNo] = useState(null);
  const [isSelect, setIsSelect] = useState(false);

  const { villagers } = useFetchStore();
  const { loading, fetchVillagerTypes, resetFilters } = useVillagerStore();

  useEffect(() => {
    resetFilters();
    fetchVillagerTypes();
  }, []);

  const closeModal = () => {
    setIsSelect(false);
    setSelectedNo(null);
  };

  return (
    <>
      <Wrap>
        <VillagerFilter onChange={closeModal} />
        {loading && (
          <div className="absolute inset-0 z-40 self-center flex flex-col items-center gap-3">
            <Loading className="size-10" />
            불러오는 중...
          </div>
        )}
        <CardWrap>
          {villagers?.map((v) => (
            <Mini
              key={v.villagerNo}
              onClick={() => {
                setSelectedNo(v.villagerNo);
                setIsSelect(true);
              }}
            >
              <VillagerImage
                src={v.villagerImageIcon}
                alt={v.villagerName}
                className="w-full aspect-square"
              />
              {v.villagerName}
            </Mini>
          ))}
        </CardWrap>
      </Wrap>
      <VillagerDetail
        selectedNo={selectedNo}
        isOpen={isSelect}
        onClose={closeModal}
      />
    </>
  );
}
