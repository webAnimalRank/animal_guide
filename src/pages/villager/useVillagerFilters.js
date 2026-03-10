export const filterSex = [
	{ value: '', label: '성별' },
	{ value: '0', label: '여자' },
	{ value: '1', label: '남자' }
];

export const filterBirth = [
	{ value: '', label: '생일' },
	...Array.from({ length: 12 }, (_, i) => ({
		value: String(i + 1).padStart(2, '0'),
		label: `${i + 1}월`
	}))
];

export const filterDebut = [
	{ value: '', label: '데뷔' },
	{ value: 'DNM', label: '동물의 숲' },
	{ value: 'DNM+', label: '동물의 숲+' },
	{ value: 'E_PLUS', label: '동물의 숲 e+' },
	{ value: 'WW', label: '놀러오세요 동물의 숲' },
	{ value: 'CF', label: '타운으로 놀러가요 동물의 숲' },
	{ value: 'NL', label: '튀어나와요 동물의 숲' },
	{ value: 'NH', label: '모여봐요 동물의 숲' }
];
