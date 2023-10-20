import { useVideoStore } from "../../stores/video.store";
import { S } from "./Player.styled";
import { useMemo, useRef } from "react";
import Control from "./components/Control/Control";
import { EnVideoPlayState } from "../../ts/enums/video.enums";
import Tools from "../Tools/Tools";

type Props = {} & React.VideoHTMLAttributes<HTMLVideoElement>;

const Player = ({ ...playerProps }: Props) => {
	const { video, setDuration, setTime, setPlayState } = useVideoStore();
	const ref = useRef<HTMLVideoElement>({} as HTMLVideoElement);
	const videoSrc = useMemo(
		() => (video ? URL.createObjectURL(video) : undefined),
		[video]
	);

	return (
		<S.Container>
			<Tools />
			<S.Video
				ref={ref}
				id="video-player"
				src={videoSrc}
				{...playerProps}
				onLoadedMetadata={() => {
					setDuration(ref.current.duration);
				}}
				onTimeUpdate={() => {
					setTime(ref.current.currentTime);
				}}
				onPlay={() => setPlayState(EnVideoPlayState.PLAYING)}
				onPause={() => setPlayState(EnVideoPlayState.PAUSED)}
			/>
			<div></div>
		</S.Container>
	);
};

export default Player;
