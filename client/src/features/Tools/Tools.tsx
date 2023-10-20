import {
	faPause,
	faPlay,
	faScissors,
	faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { S } from "./Tools.styled";
import ToolItem from "./components/Item/ToolItem";
import { useToolsStore } from "./stores/tools.store";
import { EnToolItem } from "./ts/tools.enums";
import { useVideoStore } from "../../stores/video.store";
import { useVideoElement } from "../../hooks/useVideoElement";
import { EnVideoPlayState } from "../../ts/enums/video.enums";

type Props = {};

const Tools = (props: Props) => {
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
	const { selectedItem, setSelectedItem } = useToolsStore();
	const { setVideo } = useVideoStore();
	const itemToggleHandler = (tool: EnToolItem) =>
		setSelectedItem(tool === selectedItem ? EnToolItem.NONE : tool);

	const selectedPredicate = (value: EnToolItem) => value === selectedItem;
	const uploadOnClick = () => uploadRef.current && uploadRef.current.click();
	const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.files && e.target.files[0]) {
			setVideo(e.target.files[0]);
		}
	};
	const uploadRef = useRef<HTMLInputElement>(null);
	return (
		<S.Container>
			<ToolItem
				icon={playState === EnVideoPlayState.PLAYING ? faPause : faPlay}
				name={playState === EnVideoPlayState.PLAYING ? "Pause" : "Play"}
				value={EnToolItem.UPLOAD}
				onClick={videoStateHandler}
			/>
			<ToolItem
				icon={faUpload}
				name={"Upload"}
				value={EnToolItem.UPLOAD}
				onClick={uploadOnClick}
			/>
			<S.UploadHiddenInput
				ref={uploadRef}
				type="file"
				accept="video/*"
				onChange={onFileUpload}
			/>
			<ToolItem
				predicate={selectedPredicate}
				icon={faScissors}
				name={"Cut"}
				value={EnToolItem.CUT}
				onClick={itemToggleHandler}
			/>
		</S.Container>
	);
};

export default Tools;
