import React, { useState } from "react";
import { S } from "./Marker.styled";
import Draggable from "react-draggable";

type Props = { x: number };

const Mark = ({ x }: Props) => {
	const [start, setStart] = useState<number | null>(null);
	const [end, setEnd] = useState<number | null>(null);
	const [trail, setTrail] = useState<{ start: number; end: number }>({
		start: 0,
		end: 0,
	});
	return (
		<>
			{start && <S.Spot style={{ left: start }} />}
			<Draggable
				onStart={() => {
					setStart(x);
					setTrail({ ...trail, start: x, end: x });
					setEnd(null);
				}}
				onStop={(_, element) => {
					setEnd(element.x);
				}}
				onDrag={(_, element) => {
					setTrail({ ...trail, end: element.x });
				}}
				axis="x"
				position={{ y: 0, x }}
			>
				<S.Mark>
					<S.Handle className="handle" />
				</S.Mark>
			</Draggable>
			{end && <S.Spot style={{ left: end }} />}
			{trail.start && trail.end && (
				<S.Trail
					style={{
						left: trail.start,
						width: trail.end - trail.start,
					}}
				/>
			)}
		</>
	);
};

export default Mark;
