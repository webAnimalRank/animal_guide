import { useMemo, useState } from 'react';

const filterSex = [
	{ value: '', label: '성별' },
	{ value: '0', label: '여자' },
	{ value: '1', label: '남자' }
];

const filterBirth = [
	{ value: '', label: '생일' },
	...Array.from({ length: 12 }, (_, i) => ({
		value: String(i + 1).padStart(2, '0'),
		label: `${i + 1}월`
	}))
];

export const useVillagerFilters = (onFilterChange, typeOptions = []) => {
	const [type, setType] = useState('');
	const [sex, setSex] = useState('');
	const [birthMonth, setBirthMonth] = useState('');
	const [keyword, setKeyword] = useState('');

	const filterType = useMemo(
		() => [
			{ value: '', label: '종족' },
			...typeOptions.map((opt) => ({
				value: String(opt.type),
				label: opt.typeName
			}))
		],
		[typeOptions]
	);

	const resetFilters = () => {
		setType('');
		setSex('');
		setBirthMonth('');
		setKeyword('');
		onFilterChange();
	};

	const filterConfigs = [
		{ key: 'type', value: type, setState: setType, label: '종족', options: filterType },
		{ key: 'sex', value: sex, setState: setSex, label: '성별', options: filterSex },
		{ key: 'birthMonth', value: birthMonth, setState: setBirthMonth, label: '생일', options: filterBirth }
	];

	return { filters: { type, sex, birthMonth, keyword }, filterConfigs, resetFilters, keyword, setKeyword };
};
