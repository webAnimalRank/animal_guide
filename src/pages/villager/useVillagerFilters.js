import { useState } from 'react';

export const useVillagerFilters = (onFilterChange) => {
	const [type, setType] = useState('');
	const [sex, setSex] = useState('');
	const [birthMonth, setBirthMonth] = useState('');

	const resetFilters = () => {
		setType('');
		setSex('');
		setBirthMonth('');
		onFilterChange(); // 필터 변경 시 모달 닫기 등 추가 로직 실행용
	};

	const filterConfigs = [
		{
			key: 'type',
			value: type,
			setState: setType,
			label: '종족',
			options: [
				{ value: '', label: '종족' },
				{ value: '1', label: '개' },
				{ value: '2', label: '개구리' },
				{ value: '3', label: '개미핥기' },
			]
		},
		{
			key: 'sex',
			value: sex,
			setState: setSex,
			label: '성별',
			options: [
				{ value: '', label: '성별' },
				{ value: '0', label: '여자' },
				{ value: '1', label: '남자' }
			]
		},
		{
			key: 'birthMonth',
			value: birthMonth,
			setState: setBirthMonth,
			label: '생일',
			options: [
				{ value: '', label: '생일' },
				...Array.from({ length: 12 }, (_, i) => ({
					value: String(i + 1).padStart(2, '0'),
					label: `${i + 1}월`
				}))
			]
		}
	];

	return { filters: { type, sex, birthMonth }, filterConfigs, resetFilters };
};
