const Contact = ({ filter, handleDelete }) => {
	return (
		<div>
			<p key={filter.id}>
				{filter.name} {filter.number}{" "}
				<button
					onClick={() => {
						handleDelete(filter.id);
					}}
				>
					delete
				</button>
			</p>
		</div>
	);
};

export default Contact;
