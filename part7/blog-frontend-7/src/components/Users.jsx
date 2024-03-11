import userService from "../services/users";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import {
	Box,
	Table,
	Text,
	Heading,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	Link as ChakraLink,
} from "@chakra-ui/react";

const Users = () => {
	const queryClient = useQueryClient();

	const result = useQuery({
		queryKey: ["users"],
		queryFn: userService.getAll,
		retry: 1,
	});

	if (result.isLoading) return <div>Loading...</div>;
	if (result.isError) return <div>Error!</div>;

	const users = result.data;

	console.log("users", users);

	const arrayOfBlogs = users.forEach((user) => user.blogs.length);
	console.log("array", arrayOfBlogs);

	// const blogPostStyle = {
	// 	padding: 10,
	// 	border: "solid",
	// 	borderWidth: 2,
	// 	marginBottom: 10,
	// 	width: 300,
	// };

	return (
		<Box>
			<Heading size="lg" as="h1" mb="0.5em">
				user overview
			</Heading>
			<Table>
				<Thead>
					<Tr>
						<Th>name</Th>
						<Th>username</Th>
						<Th>blogs created</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users &&
						users.map((user) => (
							<Tr key={user.id}>
								<Td>
									<ChakraLink>
										<Link to={`/users/${user.id}`}>{user.name}</Link>
									</ChakraLink>
								</Td>
								<Td>{user.username}</Td>
								<Td>{user.blogs.length}</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		</Box>
	);
};

export default Users;
