import { useRef, useEffect } from "react";

export const useVideoElement = () => {
	const videoElementRef = useRef<HTMLVideoElement>();
	useEffect(() => {
		const element = document.getElementById("video-player");
		if (element instanceof HTMLVideoElement) {
			videoElementRef.current = element;
		}
	}, []);
	return videoElementRef.current;
};
