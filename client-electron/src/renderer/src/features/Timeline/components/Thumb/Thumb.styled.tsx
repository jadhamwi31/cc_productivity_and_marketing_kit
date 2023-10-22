import styled from "styled-components";

const Wrapper = styled.div`
	height: fit-content;
	width: fit-content;
	cursor: grab;
	padding: 0.25em;
	opacity: 0.2;
`;

const Thumb = styled.div`
	height: 225px;
	width: 8px;
	background-color: var(--blue);
	border-radius: 2px;
`;

export const S = { Thumb, Wrapper };
