import { useEffect, useMemo, useRef, useState } from "react";
import { useVideoStore } from "../../../../stores/video.store";
import { S } from "./Ruler.styled";
import Thumb, { ThumbEmitter } from "../Thumb/Thumb";
import Tick from "./Tick";
import { useMeasure } from "@uidotdev/usehooks";
import { useVideoElement } from "../../../../hooks/useVideoElement";

const getScale = (duration: number) => {
	switch (true) {
		case duration <= 60:
			return 10;
		default:
			return 60;
	}
};

export const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
		.toString()
		.padStart(2, "0")}`;
};

export interface ITick {
	time: number;
	label: string;
	follow?: number;
}

type Props = {};

const Ruler = (props: Props) => {
	const { duration, thumbX, video } = useVideoStore();
	const refs = useRef<HTMLDivElement[]>([]);
	const refAdd = (el: HTMLDivElement | null) => {
		if (el && !refs.current.find((div) => div.id === el.id)) {
			refs.current.push(el);
		}
	};

	const thumbXRef = useRef(thumbX);
	useEffect(() => {
		thumbXRef.current = thumbX;
	}, [thumbX]);

	const ticks = useMemo((): ITick[] => {
		if (duration) {
			const scale = getScale(duration);
			const numberOfTicks = Math.ceil(duration / scale);

			return new Array(numberOfTicks).fill(0).map(
				(_, index): ITick => ({
					time: scale * index,
					label: formatTime(scale * index),
					follow:
						index === numberOfTicks - 1
							? Math.ceil((scale * index) / duration)
							: Math.floor(scale) - 1,
				})
			);
		} else {
			return [];
		}
	}, [duration]);

	const videoElement = useVideoElement();

	useEffect(() => {
		if (videoElement) {
			const handler = () => {
				let closest = -1;
				let minDistance = Infinity;
				let direction = "left";
				console.log(refs);

				for (const ref of refs.current) {
					const distance = ref.offsetLeft - thumbXRef.current;
					if (Math.abs(distance) < minDistance) {
						minDistance = Math.abs(distance);
						closest = Number(ref.id.slice(4));
						if (distance < 0) {
							direction = "left";
						} else {
							direction = "right";
						}
					}
				}

				if (closest !== -1) {
					videoElement.currentTime = closest;
					videoElement.play();
				}
			};

			ThumbEmitter.on("drag", handler);
			return () => {
				ThumbEmitter.off("drag", handler);
			};
		}
	}, [video, videoElement, refs]);

	useEffect(() => {
		refs.current = [];
	}, [video]);

	const [ref, { width }] = useMeasure<HTMLDivElement>();

	return (
		<S.Wrapper id="ruler" ref={ref}>
			<S.Container>
				{ticks.map((tick) => (
					<Tick tick={tick} key={tick.time} refAdd={refAdd} />
				))}
			</S.Container>
			<Thumb parentWidth={width} />
		</S.Wrapper>
	);
};

export default Ruler;
