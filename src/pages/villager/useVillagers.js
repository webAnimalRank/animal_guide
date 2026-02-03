import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// 목록 조회 훅
export function useVillagers() {
  const [data, setData] = useState([]);       // 목록 데이터 (그리드용)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/villagers`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // 백엔드 DTO(villager 접두어 버전) → 화면에서 쓰기 좋게 매핑
        const mapped = (result ?? []).map((v) => ({
          villagerNo: v.villagerNo,
          villagerName: v.villagerName,
          villagerImageIcon: v.villagerImageIcon
        }));

        setData(mapped);
      } catch (err) {
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVillagers();
  }, []);

  return { data, loading, error };
}

// 상세 조회 훅 (villagerNo 바뀔 때마다 가져옴)
export function useVillagerDetail(villagerNo, enabled = true) {
  const [data, setData] = useState(null);     // 상세 데이터 (모달용)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !villagerNo) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/api/villagers/${villagerNo}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const v = await response.json();

        // 백엔드 DTO 그대로 쓰기(필드명이 이미 명확해서 굳이 변환 안 해도 됨)
        setData(v);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [villagerNo, enabled]);

  return { data, loading, error };
}
