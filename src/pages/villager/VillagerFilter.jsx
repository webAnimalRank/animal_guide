import { useState } from 'react';
import { Filter, Nav, Select, SelectWrap } from './villager.style';
import { Search } from '../../components/style';

export default function VillagerFilter({ filterConfigs, keyword, setKeyword, onReset, onChange }) {
	const [isFilter, setIsFilter] = useState(false);

	return (
		<Nav>
			<Search
				name='search'
				placeholder='주민 이름을 검색하세요'
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
					onChange();
				}}
			/>
			<SelectWrap className={isFilter ? '' : 'hide'}>
				{filterConfigs.map((f) => (
					<Select
						key={f.key}
						value={f.value}
						onChange={(e) => {
							f.setState(e.target.value);
							onChange();
						}}
					>
						{f.options.map((opt) => (
							<option key={opt.value} value={opt.value} className='bg-(--cw)'>
								{opt.label}
							</option>
						))}
					</Select>
				))}
				<button type='button' onClick={onReset} className='text-sm self-center text-white'>
					초기화
				</button>
			</SelectWrap>
			<Filter onClick={() => setIsFilter(!isFilter)} />
		</Nav>
	);
}
