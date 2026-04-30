import { useState } from 'react';
import { Wrap } from '../../components/style';
import { Tab } from './popularity.style';
import Vote from './Vote';
import Rank from './Rank';

export default function Popularity() {
  const [tab, setTab] = useState('vote');

  return (
    <Wrap className='h-0! fixed max-sm:inset-0 bg-(--cw)/60'>
      <div className='flex gap-4 justify-center'>
        <Tab
          onClick={() => setTab('vote')}
          className={tab === 'vote' ? 'active' : ''}
        >
          투표하기
        </Tab>
        <Tab
          onClick={() => setTab('rank')}
          className={tab === 'rank' ? 'active' : ''}
        >
          투표 결과
        </Tab>
      </div>
      {tab === 'vote' ? <Vote onVoteSuccess={() => setTab('rank')} /> : <Rank />}
    </Wrap>
  );
}
