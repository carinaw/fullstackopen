type NameProps = {
	name: string;
};

const Header = ({ name }: NameProps) => {
	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
};

export default Header;
