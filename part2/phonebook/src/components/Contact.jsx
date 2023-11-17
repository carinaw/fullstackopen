const Contact = ({ filter }) => {
	return (
		<p key={filter.id}>
			{filter.name} {filter.number}
		</p>
	);
};

export default Contact;
