import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { S } from "./Thumb.styled";
import { useVideoStore } from "../../../../stores/video.store";
import EventEmitter from "eventemitter3";
import { useVideoElement } from "../../../../hooks/useVideoElement";
export const ThumbEmitter = new EventEmitter();

type Props = { parentWidth: number | null };

const Thumb = ({ parentWidth }: Props) => {
	const { time, duration, thumbX, setThumbX, video } = useVideoStore();
	const [parent, setParent] = useState<HTMLElement>();
	useEffect(() => {
		setParent(document.getElementById("ruler")!);
	}, []);

	useEffect(() => {
		if (time && duration && parentWidth) {
			const x = (parentWidth * ((time / duration) * 100)) / 100;
			setThumbX(x);
		}
	}, [duration, time, parentWidth]);
	const videoElement = useVideoElement();
	return (
		<Draggable
			axis="x"
			bounds="parent"
			position={{ x: thumbX, y: 0 }}
			onStart={() => {
				if (video) videoElement?.pause();
			}}
			onStop={() => {
				if (video) {
					ThumbEmitter.emit("drag");
				}
			}}
			onDrag={(_, dragElement) => {
				setThumbX(dragElement.x);
			}}
			offsetParent={parent}
			disabled={!video}
		>
			<S.Wrapper>
				<S.Thumb id="thumb" />
			</S.Wrapper>
		</Draggable>
	);
};

export default Thumb;
