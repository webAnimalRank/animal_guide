export default function LoadingScreen() {
	return (
		<div className='fixed inset-0 z-100 bg-(--c) flex items-center justify-center'>
			로딩 중입니다. 서버가 잠에서 깨어나는 중이라 최대 1분이 걸릴 수 있습니다.
		</div>
	);
}
