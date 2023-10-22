import styled from "styled-components";

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`;

const Container = styled.div`
	position: absolute;

	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	margin: 0 auto;
	height: 4px;
	background-color: rgba(69, 108, 248, 0.3);
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
`;

const Tick = styled.div`
	height: 12px;
	width: 1px;
	background-color: var(--blue);

	top: 100%;
`;

const TickLabel = styled.div`
	position: absolute;
	top: 150%;
	transform: translateX(-50%);
	font-size: 9px;
	opacity: 1;

	cursor: pointer;
`;

const TickFollow = styled.div`
	height: 4px;
	width: 1px;
	background-color: var(--blue);

	top: 100%;
`;

const Thumb = styled.div`
	height: 100%;
	width: 2px;
	position: absolute;
	top: 0;
	left: 2;
	background-color: var(--blue);
`;

export const S = { Container, Tick, TickLabel, TickFollow, Thumb, Wrapper };
