import styled from "styled-components";

const Container = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	left: 0;
`;

const RelativePosition = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

const Mark = styled.div`
	height: 100%;
	width: 4px;
	background-color: var(--blue);
`;

const Handle = styled.div`
	height: 100%;
	width: 100%;
`;

const Spot = styled.div`
	height: 100%;
	width: 4px;
	position: absolute;
	background-color: var(--blue);
	top: 0;
`;

const Trail = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	background-color: rgba(69, 108, 248, 0.2);
`;

export const S = { Container, RelativePosition, Mark, Handle, Spot, Trail };
