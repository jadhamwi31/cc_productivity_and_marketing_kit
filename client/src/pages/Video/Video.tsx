import React from "react";
import { S } from "./Video.styled";
import Tools from "../../features/Tools/Tools";

type Props = {};

const Video = (props: Props) => {
	return (
		<S.Container>
			<Tools />
		</S.Container>
	);
};

export default Video;
