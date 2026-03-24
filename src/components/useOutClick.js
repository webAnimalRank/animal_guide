import { useEffect } from 'react';

export const useOutClick = (ref, callback) => {
	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.addEventListener('mousedown', handleClick);
		};
	}, [ref, callback]);
};
