import Contact from "./Contact";

const ContactList = ({ filtered }) => {
	return (
		<div>
			<h2>Names & numbers</h2>
			{filtered.map((filter) => (
				<Contact key={filter.id} filter={filter} />
			))}
		</div>
	);
};

export default ContactList;
