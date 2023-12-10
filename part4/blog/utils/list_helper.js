const _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogPosts) => {
	return blogPosts.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogPosts) => {
	return blogPosts.reduce((max, post) => (post.likes > max.likes ? post : max));
};

const mostBlogs = (blogPosts) => {
	const authorPosts = _.countBy(blogPosts, "author");
	const bestAuthor = _.maxBy(
		Object.keys(authorPosts),
		(author) => authorPosts[author]
	);
	return { author: bestAuthor, posts: authorPosts[bestAuthor] };
};

const mostLikedAuthor = (blogPosts) => {
	// Author and posts
	const postsByAuthor = _.groupBy(blogPosts, "author");

	// Maps through posts by author and returns object with likes summed by posts
	const likesperAuthor = _.map(postsByAuthor, (posts, author) => {
		return { author: author, likes: _.sumBy(posts, "likes") };
	});

	// Find max by objects and value of likes
	const mostLiked = _.maxBy(likesperAuthor, "likes");

	return mostLiked;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikedAuthor,
};
