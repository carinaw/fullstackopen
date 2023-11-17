const Filter = (props) => {
	return (
		<div>
			filter by: <input value={props.newFilter} onChange={props.handleFilter} />
		</div>
	);
};

export default Filter;
