import { useState } from "react";

const ToggleVisibility = ({ children, setHiddenLabel, setVisibleLabel }) => {
	const [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div className="toggleIt">
			<span>{visible && children}</span>
			<button onClick={toggle} id="show-details">
				{" "}
				{visible ? setHiddenLabel : setVisibleLabel}
			</button>
		</div>
	);
};

export default ToggleVisibility;
