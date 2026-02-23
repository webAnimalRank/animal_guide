const formatBirthday = (birthString) => {
	if (!birthString) return '';
	const [month, day] = birthString.split('-');
	return `${Number(month)}월 ${Number(day)}일`;
};

const getGenderLabel = (sex) => (sex === 1 ? '남자' : '여자');

const getName = (data) => {
	return `${data.villagerName} | ${data.villagerNameEn} | ${data.villagerNameJp}`;
};

export const getDetailData = (detail) => [
	{ label: '이름', value: detail },
	{ label: '성별', value: getGenderLabel(detail.villagerSex) },
	{ label: '종족', value: detail.villagerTypeName },
	{ label: '생일', value: formatBirthday(detail.villagerBirth) },
	{ label: '데뷔', value: detail.villagerDebut }
];
