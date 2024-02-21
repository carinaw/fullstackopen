import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
	const dispatch = useDispatch();
	const handleFilterChange = (event) => {
		dispatch(filterChange(event.target.value));
	};
	return (
		<div>
			<p>
				filter: <input onChange={handleFilterChange} />
			</p>
		</div>
	);
};

export default Filter;
