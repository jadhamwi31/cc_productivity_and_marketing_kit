import styled from "styled-components";

const Container = styled.div`
	background-color: var(--black-lighter);
	border-radius: var(--border-radius);
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr;
	gap: 2em;
`;

const VideoWrapper = styled.div`
	display: grid;
	place-items: center;
	background-color: var(--black);
	border-radius: var(--border-radius);
	color: var(--blue);
`;

const Video = styled.video`
	height: 100%;
`;

export const S = { Container, Video, VideoWrapper };
