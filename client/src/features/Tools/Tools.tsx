import {
	faPlay,
	faScissors,
	faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { S } from "./Tools.styled";
import ToolItem from "./components/Item/ToolItem";
import { useToolsStore } from "./stores/tools.store";
import { EnToolItem } from "./ts/tools.enums";

type Props = {};

const Tools = (props: Props) => {
	const [opened, setOpened] = useState(false);
	const toggleHandler = () => setOpened((prev) => !prev);
	const { selectedItem, setSelectedItem } = useToolsStore();
	const itemToggleHandler = (tool: EnToolItem) =>
		setSelectedItem(tool === selectedItem ? EnToolItem.NONE : tool);
	const selectedPredicate = (value: EnToolItem) => value === selectedItem;

	return (
		<S.Container $toggled={opened}>
			<ToolItem
				icon={faUpload}
				name={"Upload"}
				opened={opened}
				value={EnToolItem.UPLOAD}
			/>
			<ToolItem
				predicate={selectedPredicate}
				icon={faScissors}
				name={"Cut"}
				opened={opened}
				value={EnToolItem.CUT}
				onClick={itemToggleHandler}
			/>
			<S.ToggleContainer onClick={toggleHandler}>
				<FontAwesomeIcon icon={faPlay} rotation={opened ? 180 : undefined} />
			</S.ToggleContainer>
		</S.Container>
	);
};

export default Tools;
