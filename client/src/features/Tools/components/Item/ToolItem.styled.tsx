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

const NameAnimation = keyframes`
from{opacity:0;}
to{opacity:1;}
`;

const Name = styled.p`
	font-size: 14px;
	animation-name: ${NameAnimation};
	animation-duration: 0.5s;
`;

export const S = { Container, Name };
