import { useState } from "react";

const ToggleVisibility = ({ children, setHiddenLabel, setVisibleLabel }) => {
	const [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div className="toggleIt">
			{visible && children}
			<button onClick={toggle}>
				{" "}
				{visible ? setHiddenLabel : setVisibleLabel}
			</button>
		</div>
	);
};

export default ToggleVisibility;
