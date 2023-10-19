import { useVideoStore } from "../../stores/video.store";
import { S } from "./Player.styled";

type Props = {} & React.VideoHTMLAttributes<HTMLVideoElement>;

const Player = ({ ...playerProps }: Props) => {
	const { video } = useVideoStore();
	return (
		video && (
			<S.Container>
				<video src={URL.createObjectURL(video)} {...playerProps} controls />
			</S.Container>
		)
	);
};

export default Player;
