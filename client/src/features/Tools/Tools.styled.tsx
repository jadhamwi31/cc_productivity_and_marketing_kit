import styled from "styled-components";

const Container = styled.div<{ $toggled: boolean }>`
	position: fixed;
	top: 25%;
	left: 0;
	transform: translateY(-25%);
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
	max-width: ${({ $toggled }) => ($toggled ? "110px" : "55px")};
	transition: all 0.2s ease;
	overflow-x: hidden;
	user-select: none;
	& button {
		width: 100%;
	}
`;

const ToggleContainer = styled.div`
	scale: 0.5;
	cursor: pointer;
	align-self: flex-start;
	margin-left: 0.5em;
	flex: 1;
`;

const UploadHiddenInput = styled.input`
	display: none;
`;

export const S = { Container, ToggleContainer, UploadHiddenInput };
