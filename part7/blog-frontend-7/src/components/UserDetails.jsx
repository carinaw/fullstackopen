import userService from "../services/users";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";

const UserDetails = () => {
	const queryClient = useQueryClient();
	const id = useParams().id;

	const result = useQuery({
		queryKey: ["users"],
		queryFn: userService.getAll,
		retry: 1,
	});

	if (result.isLoading) return <div>Loading...</div>;
	if (result.isError) return <div>Error!</div>;

	const users = result.data;

	const user = users.find((u) => u.id === id);
	console.log("id", typeof id);
	console.log("users", users);
	console.log("user", typeof user);

	{
		if (user.blogs.length === 0)
			return (
				<Box>
					<Heading size="lg">{user.name}</Heading>
					<Heading size="md">blog posts created</Heading>
					<Text>No posts yet.</Text>
				</Box>
			);
	}

	return (
		<Box>
			<Heading size="lg" mb="0.25em">
				{user.name}
			</Heading>
			<Divider />
			<Heading size="md" mt="1em" mb="0.5em">
				blog posts created
			</Heading>
			{user.blogs.map((blog) => (
				<li key={blog.id}>{blog.title}</li>
			))}
		</Box>
	);
};

export default UserDetails;
