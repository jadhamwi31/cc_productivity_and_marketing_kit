import styled from "styled-components";

const Container = styled.div`
	background-color: var(--black-lighter);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	border-top-right-radius: 4px;
	gap: 1em;
	border-bottom-right-radius: 4px;

	padding: 0.5em;
	width: 100%;

	transition: all 0.2s ease;
	overflow-x: hidden;
	user-select: none;
	border: solid 1px var(--blue);
	& button {
		width: 100%;
	}
`;

const UploadHiddenInput = styled.input`
	display: none;
`;

export const S = { Container, UploadHiddenInput };
