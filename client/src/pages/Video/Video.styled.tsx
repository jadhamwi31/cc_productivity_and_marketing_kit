import styled from "styled-components";

const Container = styled.div`
	position: relative;
	width: 100%;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	gap: 1em;
	background-color: var(--black-lighter);
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	padding: 2em;
`;

export const S = { Container };
