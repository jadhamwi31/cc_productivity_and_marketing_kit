import { useVideoElement } from "../../../../hooks/useVideoElement";
import { useVideoStore } from "../../../../stores/video.store";
import { ITick, formatTime } from "./Ruler";
import { S } from "./Ruler.styled";

type Props = {
	tick: ITick;
};

const Tick = ({ tick }: Props) => {
	const videoElement = useVideoElement();
	const timeClickHandler = (time: number) => {
		if (videoElement) {
			videoElement.currentTime = time;
		}
	};
	return (
		<>
			<S.Tick key={tick.time}>
				<S.TickLabel onClick={() => timeClickHandler(tick.time)}>
					{tick.label}
				</S.TickLabel>
			</S.Tick>
			{tick.follow !== 0 &&
				new Array(tick.follow).fill(0).map((_, subindex) => (
					<S.TickFollow
						key={tick.time + subindex + 1}
						onClick={() => timeClickHandler(tick.time + subindex + 1)}
					>
						<S.TickLabel>{formatTime(tick.time + subindex + 1)}</S.TickLabel>
					</S.TickFollow>
				))}
		</>
	);
};

export default Tick;
