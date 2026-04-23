import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchStore } from '../store/useFetchStore';
import { Url, Page, Menu, Head, Icon, Url2 } from './style';
import { Links2 } from '../pages/home/Links';
import toast from 'react-hot-toast';
import Logo from '../assets/img/logo.png';
import tom from '../assets/img/tom_icon.png';

const links = [
	{ to: 'villager', label: '주민 명부' },
	{ to: 'popularity', label: '인기 투표' },
	{ to: 'board', label: '커뮤니티' }
];

export default function Header() {
	const { member, villagers } = useFetchStore();
	const [menu, setMenu] = useState(false);

	const profileImage = villagers?.find((v) => v.villagerNo === member?.profileVillagerNo)?.villagerImageIcon;

	return (
		<>
			<Head>
				<div className='w-7xl h-full px-5 flex justify-between max-md:justify-center items-center relative'>
					<Menu onClick={() => setMenu(!menu)} />
					<nav className='w-max h-full flex gap-5 items-center'>
						<NavLink className='h-10 max-sm:h-7' to='/'>
							<img className='h-full' src={Logo} alt='' />
						</NavLink>
						{links.map((link, index) => (
							<Page key={index} className={({ isActive }) => (isActive ? 'active' : '')} to={link.to}>
								{link.label}
							</Page>
						))}
					</nav>
					<nav className='w-max flex gap-5 items-center absolute right-5'>
						{member ? (
							<>
								<Icon to='/mypage'>
									<img src={profileImage || tom} className='' alt='' />
								</Icon>
							</>
						) : (
							<>
								<Url2 className='login max-md:text-[0px]' to='/login'>
									로그인
								</Url2>
								<Url2 className='sign max-md:hidden' to='/sign'>
									회원가입
								</Url2>
							</>
						)}
					</nav>
				</div>
			</Head>
			<Links2 menu={menu} onClose={() => setMenu(false)} />
		</>
	);
}
