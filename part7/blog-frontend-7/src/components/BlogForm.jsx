import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNotification } from "../contexts/NotificationContext";
import {
	Input,
	Button,
	Flex,
	Box,
	Heading,
	Text,
	Stack,
} from "@chakra-ui/react";

const BlogForm = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const { setSuccessMessage, setErrorMessage } = useNotification();

	const queryClient = useQueryClient();

	const newBlogPost = useMutation({
		mutationFn: blogService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blogs"] }),
				setSuccessMessage("New blog post added!");
		},
		onError: () => {
			setErrorMessage("Error creating blog post!");
		},
	});

	const handleNewPost = async (event) => {
		event.preventDefault();
		console.log("adding post", title, author, url);
		newBlogPost.mutate({ title, author, url });
		setAuthor("");
		setTitle("");
		setUrl("");
	};
	return (
		<Box>
			<Heading pb="0.5em" size="1xl">
				create new blog post
			</Heading>
			<Box my="1em">
				<form onSubmit={handleNewPost}>
					<Stack direction="row" spacing="24px" my="1em">
						<Box flex="1">
							<Text>title: </Text>
						</Box>
						<Box>
							<Input
								type="text"
								value={title}
								name="title"
								onChange={({ target }) => setTitle(target.value)}
								id="title-input"
								width="auto"
							/>
						</Box>
					</Stack>
					<Stack direction="row" spacing="24px" my="1em">
						<Box flex="1">
							<Text>author: </Text>
						</Box>
						<Box>
							<Input
								type="text"
								value={author}
								name="author"
								onChange={({ target }) => setAuthor(target.value)}
								id="author-input"
								width="auto"
							/>
						</Box>
					</Stack>
					<Stack direction="row" spacing="24px" my="1em">
						<Box flex="1">
							<Text>url: </Text>
						</Box>
						<Box>
							<Input
								type="text"
								value={url}
								name="url"
								onChange={({ target }) => setUrl(target.value)}
								id="url-input"
								width="auto"
							/>
						</Box>
					</Stack>
					<Box my="1em">
						<Button type="submit" id="login">
							create
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default BlogForm;
