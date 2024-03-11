import axios from "axios";
const baseUrl = "/api/comments";

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const post = async ({ comment, id }) => {
	const response = await axios.post(baseUrl, { content: comment, blog: id });
	return response.data;
};

export default { getAll, post };
