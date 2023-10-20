import { useMemo, useRef } from "react";
import { useVideoStore } from "../../../../stores/video.store";
import { S } from "./Ruler.styled";
import Thumb from "../Thumb/Thumb";

const getScale = (duration: number) => {
	switch (true) {
		case duration <= 60:
			return 15;
		default:
			return 60;
	}
};

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
		.toString()
		.padStart(2, "0")}`;
};

interface ITick {
	time: number;
	label: string;
	follow?: number;
}

type Props = {};

const Ruler = (props: Props) => {
	const { duration, time } = useVideoStore();

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
	console.log(ticks);

	return (
		<S.Wrapper>
			<S.Container>
				{ticks.map((tick) => {
					if (time) console.log(tick.time, Number(time.toFixed()));

					return (
						<>
							<S.Tick key={tick.label}>
								<S.TickLabel>{tick.label}</S.TickLabel>
								{time ? (
									Number(time.toFixed()) === tick.time ? (
										<Thumb />
									) : null
								) : null}
							</S.Tick>
							{tick.follow !== 0 &&
								new Array(tick.follow).fill(0).map((_, subindex) => (
									<S.TickFollow key={tick.time + subindex}>
										<S.TickLabel>
											{formatTime(tick.time + subindex + 1)}
										</S.TickLabel>
										{time ? (
											Number(time.toFixed()) === tick.time + subindex + 1 ? (
												<Thumb />
											) : null
										) : null}
									</S.TickFollow>
								))}
						</>
					);
				})}
			</S.Container>
		</S.Wrapper>
	);
};

export default Ruler;
