import React from "react";
import { S } from "./Timeline.styled";
import Ruler from "./components/Ruler/Ruler";
import Thumb from "./components/Thumb/Thumb";

type Props = {};

const Timeline = (props: Props) => {
	return (
		<S.Container>
			<Ruler />
		</S.Container>
	);
};

export default Timeline;
