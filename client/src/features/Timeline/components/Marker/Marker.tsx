import React, { useState } from "react";
import { S } from "./Marker.styled";
import Mark from "./Mark";

type Props = {};

const Marker = (props: Props) => {
	const [x, setX] = useState<number | null>(null);
	return (
		<S.Container>
			<S.RelativePosition
				onMouseMove={(e) => {
					let currentTargetRect = e.currentTarget.getBoundingClientRect();
					setX(e.pageX - currentTargetRect.left);
				}}
			>
				{x !== null && <Mark x={x} />}
			</S.RelativePosition>
		</S.Container>
	);
};

export default Marker;
