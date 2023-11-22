import Contact from "./Contact";

const ContactList = ({ filtered, handleDelete }) => {
	return (
		<div>
			<h2>Names & numbers</h2>
			{filtered.map((filter) => (
				<Contact key={filter.id} filter={filter} handleDelete={handleDelete} />
			))}
		</div>
	);
};

export default ContactList;
