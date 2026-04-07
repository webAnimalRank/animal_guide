import toast from 'react-hot-toast';
import { Btn2 } from './style';

export const confirmToast = ({ message, onConfirm }) => {
	toast(
		(t) => (
			<div className='flex flex-col gap-4'>
				{message}
				<div className='flex self-end'>
					<Btn2 onClick={() => toast.dismiss(t.id)}>취소</Btn2>
					<Btn2
						className='text-(--p)'
						onClick={async () => {
							toast.dismiss(t.id);
							if (onConfirm) await onConfirm();
						}}
					>
						확인
					</Btn2>
				</div>
			</div>
		),
		{ id: 'confirm', duration: Infinity }
	);
};
