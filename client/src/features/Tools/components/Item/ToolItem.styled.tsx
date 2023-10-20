import styled, { keyframes } from "styled-components";

const Container = styled.div<{ $selected: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5em;
	height: 25px;
	width: 100%;
	color: ${({ $selected }) => ($selected ? "var(--blue)" : "inherit")};
`;

const Name = styled.p`
	font-size: 14px;
	width: 100%;
	text-align: center;
`;

export const S = { Container, Name };
