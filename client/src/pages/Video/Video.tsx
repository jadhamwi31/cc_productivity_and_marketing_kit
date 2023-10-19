import Player from "../../features/Player/Player";
import Timeline from "../../features/Timeline/Timeline";
import Tools from "../../features/Tools/Tools";
import { S } from "./Video.styled";

type Props = {};

const Video = (props: Props) => {
	return (
		<S.Container>
			<Tools />
			<S.Editor>
				<Player style={{ height: "50vh", width: "50vw" }} />
				<Timeline />
			</S.Editor>
		</S.Container>
	);
};

export default Video;
