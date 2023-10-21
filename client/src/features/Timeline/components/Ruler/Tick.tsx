import { useEffect, useRef } from "react";
import { ITick, formatTime } from "./Ruler";
import { S } from "./Ruler.styled";
import { ThumbEmitter } from "../Thumb/Thumb";
import { useVideoStore } from "../../../../stores/video.store";

type Props = {
	tick: ITick;
	refAdd: (el: HTMLDivElement | null) => void;
};

const Tick = ({ tick, refAdd }: Props) => {
	return (
		<>
			<S.Tick key={tick.time} ref={refAdd} id={"time" + tick.time.toString()}>
				<S.TickLabel>{tick.label}</S.TickLabel>
			</S.Tick>
			{tick.follow !== 0 &&
				new Array(tick.follow).fill(0).map((_, subindex) => (
					<S.TickFollow
						key={tick.time + subindex + 1}
						ref={refAdd}
						id={"time" + (tick.time + subindex + 1).toString()}
					>
						<S.TickLabel>{formatTime(tick.time + subindex + 1)}</S.TickLabel>
					</S.TickFollow>
				))}
		</>
	);
};

export default Tick;
