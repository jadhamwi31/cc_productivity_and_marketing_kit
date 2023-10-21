import styled from "styled-components";

const Wrapper = styled.div`
	height: fit-content;
	width: fit-content;
	cursor: grab;
	padding: 0.25em;
`;

const Thumb = styled.div`
	height: 225px;
	width: 8px;
	background-color: var(--blue);

	z-index: 10;
`;

export const S = { Thumb, Wrapper };
