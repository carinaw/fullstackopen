import blogService from "../services/blogs";
import commentService from "../services/comments";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useState } from "react";
import { Button, Box, Text, Flex, Heading, Input } from "@chakra-ui/react";

const BlogDetails = ({ handleLikes }) => {
	const { setSuccessMessage, setErrorMessage } = useNotification();
	const [comment, setComment] = useState("");

	const queryClient = useQueryClient();
	const id = useParams().id;

	const result = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		retry: 1,
	});

	const newComment = useMutation({
		mutationFn: commentService.post,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
		},
		onError: () => {
			setErrorMessage("Error creating blog post!");
		},
	});

	const handleComment = async (event) => {
		event.preventDefault();
		console.log("log new comment", comment, id);
		newComment.mutate({ comment, id });
		setComment("");
	};

	if (result.isLoading) return <div>Loading...</div>;
	if (result.isError) return <div>Error!</div>;

	const blogs = result.data;

	const blog = blogs.find((b) => b.id === id);
	if (!blog) return <div>Blog post not found.</div>;

	console.log("id", typeof id);
	console.log("blogs", blogs);
	console.log("blog", blog);

	return (
		<Box>
			<Heading size="lg" as="h1" mb="0.5em">
				{blog.title}
			</Heading>
			<Text>
				<a href="">{blog.url}</a>
			</Text>
			<Text>
				{blog.likes} likes{" "}
				<Button
					onClick={() => handleLikes(blog.id, blog)}
					size="xs"
					ml="0.5em"
					variant="outline"
				>
					like
				</Button>
			</Text>
			<Text>added by {blog.user?.username || "anonymous user"}</Text>
			<Heading size="1xl" mt="1em" mb="0.5em">
				comments
			</Heading>
			<Box w="300px" my="0.5em">
				<form onSubmit={handleComment}>
					<Input
						type="text"
						placeholder="leave your comment"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					></Input>
					<Button type="submit" my="0.5em">
						comment
					</Button>
				</form>
			</Box>
			<div>
				{blog.comments.map((comment) => (
					<li key={comment.id}>{comment.content}</li>
				))}
			</div>
		</Box>
	);
};

export default BlogDetails;
