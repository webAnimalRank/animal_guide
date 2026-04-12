import React, { useState } from 'react';
import { Wrap } from '../../components/style';
import { Fold } from './mypage.style';
import MyInfo from './MyInfo';
import MyPost from './MyPost';
import MyPick from './MyPick';
import { useFetchStore } from '../../store/useFetchStore';

export default function MyPage() {
  const { member } = useFetchStore();

  const sectionData = [
    { key: 'info', title: '내 정보', component: MyInfo },
    { key: 'pick', title: '내 투표', component: MyPick },
    { key: 'post', title: '내 작성글', component: MyPost }
  ];
  const [sections, setSections] = useState(
    Object.fromEntries(sectionData.map(({ key }) => [key, false]))
  );

  const toggleSection = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!member) return <p>로그인이 필요합니다.</p>;

  return (
    <Wrap className="px-20 max-lg:px-10 max-md:px-5 max-sm:px-2">
      {sectionData.map(({ key, title, component: Component }) => (
        <React.Fragment key={key}>
          <Fold
            onClick={() => toggleSection(key)}
            className={!sections[key] ? 'fold' : ''}
          >
            <h3 className="max-sm:text-xl">{title}</h3>
          </Fold>
          {sections[key] && <Component  />}
        </React.Fragment>
      ))}
    </Wrap>
  );
}
