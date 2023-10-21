import { DraggableCore } from "react-draggable";
import { S } from "./Timeline.styled";
import Ruler from "./components/Ruler/Ruler";
import Marker from "./components/Marker/Marker";

type Props = {};

const Timeline = (props: Props) => {
	return (
		<S.Container>
			<Ruler />
			<Marker />
		</S.Container>
	);
};

export default Timeline;
