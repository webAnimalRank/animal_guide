import { useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * ✅ 목록/필터 조회 훅
 * type: '' | number/string
 * sex: '' | 0 | 1
 * birthMonth: '' | '01'~'12' | 1~12
 */
export function useVillagersSearch({ type = '', sex = '', birthMonth = '', keyword = '' } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (type !== '' && type !== null && type !== undefined) params.set('type', String(type));
    if (sex !== '' && sex !== null && sex !== undefined) params.set('sex', String(sex));

    if (birthMonth) {
      const mm = String(birthMonth).padStart(2, '0');
      params.set('birthMonth', mm);
    }
    if (keyword && String(keyword).trim() !== '') {
      params.set('keyword', String(keyword).trim());
    }

    const s = params.toString();
    return s ? `?${s}` : '';
  }, [type, sex, birthMonth, keyword]);

  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/villagers/search${queryString}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();

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
  }, [queryString]);

  return { data, loading, error };
}

/**
 * ✅ 상세 조회 훅 (기존 그대로)
 */
export function useVillagerDetail(villagerNo, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !villagerNo) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/villagers/${villagerNo}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const v = await response.json();
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
