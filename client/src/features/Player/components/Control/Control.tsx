import React, { useEffect } from "react";
import { S } from "./Control.styled";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoStore } from "../../../../stores/video.store";
import { EnVideoPlayState } from "../../../../ts/enums/video.enums";
import {
	faMaximize,
	faMinimize,
	faPause,
	faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useVideoElement } from "../../../../hooks/useVideoElement";

type Props = {};

const Control = (props: Props) => {
	const { playState, setFullscreen } = useVideoStore();
	const videoRef = useVideoElement();
	const videoStateHandler = () => {
		if (playState === EnVideoPlayState.PAUSED) {
			videoRef?.play();
		} else {
			videoRef?.pause();
		}
	};

	useEffect(() => {
		const setter = () => {
			if (document.fullscreenEnabled) {
				setFullscreen(true);
			} else {
				setFullscreen(false);
			}
		};
		document.addEventListener("fullscreenchange", setter);
		return () => document.removeEventListener("fullscreenchange", setter);
	}, []);

	return (
		<S.Container>
			<Button onClick={videoStateHandler}>
				<FontAwesomeIcon
					icon={playState === EnVideoPlayState.PAUSED ? faPlay : faPause}
				/>
			</Button>
		</S.Container>
	);
};

export default Control;
