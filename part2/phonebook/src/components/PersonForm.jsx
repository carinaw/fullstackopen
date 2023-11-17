const PersonForm = (props) => {
	return (
		<div>
			<h2>Add new entry</h2>
			<form onSubmit={props.addPerson}>
				<div>
					name:{" "}
					<input value={props.newName} onChange={props.handleNameAddition} />
				</div>
				<div>
					number:{" "}
					<input
						value={props.newNumber}
						onChange={props.handleNumberAddition}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
};

export default PersonForm;
