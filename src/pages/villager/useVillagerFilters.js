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

const filterDebut = [
	{ value: '', label: '데뷔' },
	{ value: 'DNM', label: '동물의 숲 (닌텐도 64)' },
	{ value: 'DNM+', label: '동물의 숲+ (게임큐브)' },
	{ value: 'E_PLUS', label: '동물의 숲 e+ (게임큐브)' },
	{ value: 'AC (GC)', label: '동물의 숲 (게임큐브)' },
	{ value: 'WW', label: '놀러오세요 동물의 숲 (닌텐도 DS)' },
	{ value: 'CF', label: '타운으로 놀러가요 동물의 숲 (Wii)' },
	{ value: 'NL', label: '튀어나와요 동물의 숲 (닌텐도 3DS)' },
	{ value: 'HHD', label: '해피 홈 디자이너 (닌텐도 3DS)' },
	{ value: 'AF', label: '아미보 페스티벌 (Wii U)' },
	{ value: 'PC', label: '포켓 캠프 (iOS / Android)' },
	{ value: 'NH', label: '모여봐요 동물의 숲 (닌텐도 스위치)' },
	{ value: 'HHP', label: '해피 홈 파라다이스 (닌텐도 스위치, DLC)' }
];

export const useVillagerFilters = (onFilterChange, typeOptions = []) => {
	const [type, setType] = useState('');
	const [sex, setSex] = useState('');
	const [birthMonth, setBirthMonth] = useState('');
	const [debut, setDebut] = useState('');
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
		setDebut('');
		setKeyword('');
		onFilterChange();
	};

	const filterConfigs = [
		{ key: 'type', value: type, setState: setType, label: '종족', options: filterType },
		{ key: 'sex', value: sex, setState: setSex, label: '성별', options: filterSex },
		{ key: 'birthMonth', value: birthMonth, setState: setBirthMonth, label: '생일', options: filterBirth },
		{ key: 'debut', value: debut, setState: setDebut, label: '데뷔', options: filterDebut }
	];

	return { filters: { type, sex, birthMonth, debut, keyword }, filterConfigs, resetFilters, keyword, setKeyword };
};
