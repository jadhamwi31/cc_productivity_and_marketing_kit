import styled from "styled-components";

const Container = styled.div`
	padding: 0.5em;
	background-color: var(--black-lighter);
	border-radius: var(--border-radius);
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr;
	gap: 2em;
`;

const Video = styled.video`
	border-radius: var(--border-radius);
	height: 100%;
`;

export const S = { Container, Video };
