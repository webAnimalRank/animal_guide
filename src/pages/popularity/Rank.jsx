import tom from '../../assets/img/tom_icon.png';

export default function Rank() {
  return (
    <div>
      <table className='bg-white/10 w-full'>
        <thead>
          <th>순위</th>
          <th className='w-30 p-4'>이미지</th>
          <th>이름</th>
          <th>표</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img className='w-30' src={tom} alt='' />
            </td>
            <td>너굴</td>
            <td>3표</td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <img className='w-30' src={tom} alt='' />
            </td>
            <td>너굴</td>
            <td>3표</td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <img className='w-30' src={tom} alt='' />
            </td>
            <td>너굴</td>
            <td>3표</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
