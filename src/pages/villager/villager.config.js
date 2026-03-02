const DEBUT_LABEL_MAP = {
	DNM: '동물의 숲',
	'DNM+': '동물의 숲+',
	E_PLUS: '동물의 숲 e+',
	'AC (GC)': '동물의 숲 (게임큐브)',
	'AC(GC)': '동물의 숲 (게임큐브)',
	WW: '놀러오세요 동물의 숲',
	CF: '타운으로 놀러가요 동물의 숲',
	NL: '튀어나와요 동물의 숲',
	HHD: '해피 홈 디자이너 (닌텐도 3DS)',
	AF: '아미보 페스티벌 (Wii U)',
	PC: '포켓 캠프 (iOS / Android)',
	NH: '모여봐요 동물의 숲',
	HHP: '해피 홈 파라다이스 (닌텐도 스위치, DLC)'
};

const formatBirthday = (birthString) => {
	if (!birthString) return '';
	const [month, day] = birthString.split('-');
	return `${Number(month)}월 ${Number(day)}일`;
};

const getGenderLabel = (sex) => (sex === 1 ? '남자' : '여자');

const getDebutLabel = (debutCode) => {
	if (!debutCode) return '';

	const tokens = String(debutCode)
		.split(/[\/,]/)
		.map((part) => part.trim())
		.filter(Boolean);

	return tokens
		.map((token) => {
			const normalized = token.replace(/\s+/g, ' ');
			const upper = normalized.toUpperCase();
			return DEBUT_LABEL_MAP[normalized] ?? DEBUT_LABEL_MAP[upper] ?? normalized;
		})
		.join(' / ');
};

export const getDetailData = (detail) => [
	{ label: '이름', value: detail },
	{ label: '성별', value: getGenderLabel(detail.villagerSex) },
	{ label: '종족', value: detail.villagerTypeName },
	{ label: '생일', value: formatBirthday(detail.villagerBirth) },
	{ label: '데뷔', value: getDebutLabel(detail.villagerDebut) }
];
