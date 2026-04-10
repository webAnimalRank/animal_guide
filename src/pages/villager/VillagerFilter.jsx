import { useRef, useState } from 'react';
import { Filter, Nav, Reset, Select, SelectWrap } from './villager.style';
import { Search } from '../../components/style';
import { useVillagerStore } from './useStore';
import { useOutClick } from '../../components/useOutClick';

// onChange는 모달 닫기용
export default function VillagerFilter({ onChange }) {
	const { filters, setKeyword, resetFilters, getFilterConfigs } = useVillagerStore();
	const [isFilter, setIsFilter] = useState(false);
	const filterConfigs = getFilterConfigs();
	const filterRef = useRef(null);

	useOutClick(filterRef, () => setIsFilter(false));

	return (
		<Nav>
			<Search
				name='search'
				placeholder='주민 이름을 검색하세요'
				value={filters.keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
					onChange?.();
				}}
			/>
			<div ref={filterRef}>
				<SelectWrap className={isFilter ? '' : 'hide'}>
					{filterConfigs.map((f) => (
						<Select
							key={f.key}
							value={f.value}
							onChange={(e) => {
								f.setState(e.target.value);
								onChange?.();
							}}
						>
							{f.options.map((opt) => (
								<option key={opt.value} value={opt.value} className='bg-(--cw)'>
									{opt.label}
								</option>
							))}
						</Select>
					))}
					<Reset onClick={resetFilters}>초기화</Reset>
				</SelectWrap>
				<Filter onClick={() => setIsFilter(!isFilter)} />
			</div>
		</Nav>
	);
}
