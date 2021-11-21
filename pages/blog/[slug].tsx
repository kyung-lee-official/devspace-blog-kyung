import fs from "fs";
import path from "path";

const PostPage = () => {
	return <div></div>;
};

export default PostPage;

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join("posts")) as any;
	const paths = files.map((filename: string) => ({
		params: {
			slug: filename.replace(".md", ""),
		},
	}));
	return {
		paths,
		fallback: false,
	};
}
