import { useCallback, useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const MAX_VOTES = 3;

/**
 * 주민 인기 투표 상태 관리 훅
 * @returns {Object} 투표 상태 및 핸들러
 */
export function usePopularityVotes() {
	const [selectedIds, setSelectedIds] = useState([]);
	const [selectedVillagerCache, setSelectedVillagerCache] = useState(new Map());
	const [remainingVotes, setRemainingVotes] = useState(MAX_VOTES);
	const [submitting, setSubmitting] = useState(false);

	// 투표 상태 초기화
	useEffect(() => {
		const fetchVoteStatus = async () => {
			try {
				const res = await fetch(`${API_URL}/api/villagers/votes/me`, {
					credentials: 'include'
				});

				if (res.ok) {
					const data = await res.json();
					setRemainingVotes(data.remainingVotes ?? MAX_VOTES);
				} else {
					setRemainingVotes(MAX_VOTES);
				}
			} catch (e) {
				console.error('투표 상태 조회 실패:', e);
				setRemainingVotes(MAX_VOTES);
			}
		};

		fetchVoteStatus();
	}, []);

	// 선택된 주민 데이터
	const selectedVillagers = useMemo(() => {
		return selectedIds.map((id) => selectedVillagerCache.get(id)).filter(Boolean);
	}, [selectedIds, selectedVillagerCache]);

	// 주민 선택/해제
	const toggleVillager = useCallback(
		(villager, checked) => {
			if (!checked) {
				setSelectedIds((prev) => prev.filter((v) => v !== villager.villagerNo));
				return;
			}

			setSelectedIds((prev) => {
				if (prev.length >= remainingVotes) return prev;
				return [...prev, villager.villagerNo];
			});

			// 캐시에 저장
			setSelectedVillagerCache((prev) => new Map(prev).set(villager.villagerNo, villager));
		},
		[remainingVotes]
	);

	// 투표 제출
	const submitVotes = useCallback(async () => {
		if (selectedIds.length === 0) {
			return { success: false, message: '선택한 주민이 없습니다.' };
		}

		setSubmitting(true);

		try {
			const res = await fetch(`${API_URL}/api/villagers/votes`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ villagerNos: selectedIds })
			});

			if (!res.ok) {
				let errorMsg = '투표 처리에 실패했습니다.';
				try {
					const errData = await res.json();
					if (errData?.message) errorMsg = errData.message;
				} catch {
					// 무시
				}
				throw new Error(errorMsg);
			}

			const data = await res.json();
			setRemainingVotes(data.remainingVotes ?? 0);
			setSelectedIds([]);
			setSelectedVillagerCache(new Map());

			return { success: true, message: '투표가 완료되었습니다.' };
		} catch (e) {
			console.error('투표 제출 실패:', e);
			return { success: false, message: e.message ?? '투표 중 오류가 발생했습니다.' };
		} finally {
			setSubmitting(false);
		}
	}, [selectedIds]);

	return {
		selectedIds,
		selectedVillagers,
		remainingVotes,
		submitting,
		toggleVillager,
		submitVotes,
		maxVotes: MAX_VOTES
	};
}
