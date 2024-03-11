import { useState } from "react";
import { Button, Box, Flex } from "@chakra-ui/react";

const ToggleVisibility = ({ children, setHiddenLabel, setVisibleLabel }) => {
	const [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<Box className="toggleIt">
			<Flex direction="column">
				<Box flex="1">{visible && children}</Box>
				<Button onClick={toggle} id="show-details">
					{" "}
					{visible ? setHiddenLabel : setVisibleLabel}
				</Button>
			</Flex>
		</Box>
	);
};

export default ToggleVisibility;
