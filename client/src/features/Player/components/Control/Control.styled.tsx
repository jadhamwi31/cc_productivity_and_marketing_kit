import styled from "styled-components";

const Container = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);

	overflow-y: auto;
	border: solid 1px var(--blue);
	padding: 1em;
	border-radius: var(--border-radius);
	& button {
		height: fit-content;
		width: fit-content;
	}
`;

export const S = { Container };
