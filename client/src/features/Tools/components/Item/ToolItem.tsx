import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Button from "../../../../components/Button/Button";
import { S } from "./ToolItem.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnToolItem } from "../../ts/tools.enums";

type Props = {
	icon: IconDefinition;
	name: string;
	value: EnToolItem;
	onClick?: (tool: EnToolItem) => void;
	predicate?: (value: EnToolItem) => boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const ToolItem = ({
	icon,
	name,
	value,
	onClick,
	predicate,
	...buttonProps
}: Props) => {
	const isSelected = predicate ? predicate(value) : false;
	return (
		<Button
			{...buttonProps}
			onClick={() => onClick && onClick(value)}
			style={{
				backgroundColor: isSelected ? "transparent" : "rgba(0,0,0,0.4)",
			}}
		>
			<S.Container $selected={isSelected}>
				<FontAwesomeIcon icon={icon} />
				<S.Name>{name}</S.Name>
			</S.Container>
		</Button>
	);
};

export default ToolItem;
