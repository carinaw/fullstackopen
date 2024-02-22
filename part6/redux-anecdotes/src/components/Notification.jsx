import { useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";

const Notification = ({ notification }) => {
	console.log("notification", notification);
	const notifications = useSelector(({ notification }) => {
		return notification;
	});

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};
	return <div style={style}>{notifications}</div>;
};

export default Notification;
