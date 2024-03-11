import ToggleVisibility from "./ToggleVisibility";
import { useState } from "react";
import blogService from "../services/blogs";
import { Link, useParams } from "react-router-dom";
import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text,
	LinkBox,
	LinkOverlay,
} from "@chakra-ui/react";

const Blog = ({ blog, user, handleDelete, handleLikes }) => {
	return (
		<div className="a-blog">
			<LinkBox>
				<Card variant="filled" size="md">
					<CardHeader>
						<Heading size="sm">
							<LinkOverlay as={Link} to={`/blogs/${blog.id}`}>
								{blog.title}
							</LinkOverlay>
						</Heading>
					</CardHeader>
					<CardBody>
						<Text>{blog.author && `by ${blog.author}`}</Text>
					</CardBody>
				</Card>
			</LinkBox>
		</div>
	);
};

export default Blog;
