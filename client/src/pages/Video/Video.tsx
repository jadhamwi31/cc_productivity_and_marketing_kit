import { useEffect } from "react";
import Player from "../../features/Player/Player";
import Timeline from "../../features/Timeline/Timeline";
import { useFFMpegStore } from "../../stores/ffmpeg.store";
import { S } from "./Video.styled";
import Button from "../../components/Button/Button";
import { useVideoStore } from "../../stores/video.store";

type Props = {};

const Video = (props: Props) => {
	const { loading, load } = useFFMpegStore();

	useEffect(() => {
		load();
	}, []);

	return loading ? (
		<div>Loading...</div>
	) : (
		<S.Container>
			<Player style={{ height: "50vh", width: "50vw" }} />
			<Timeline />
		</S.Container>
	);
};

export default Video;
