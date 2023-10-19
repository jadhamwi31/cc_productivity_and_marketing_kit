import styled from "styled-components";

const Container = styled.div`
	position: relative;

	display: grid;
	place-items: center;
`;

const Editor = styled.div`
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	gap: 1em;

	height: 100vh;
	padding: 1em 0;
`;

export const S = { Container, Editor };
