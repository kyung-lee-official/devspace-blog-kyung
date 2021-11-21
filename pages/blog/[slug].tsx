import fs from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import path from "path";

const PostPage: NextPage = ({
	frontmatter: { title, category, date, cover_image, author, author_image },
	content,
	slug,
}: any) => {
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

export async function getStaticProps({
	params: { slug },
}: {
	params: { slug: any };
}) {
	const markdownWithMeta = fs.readFileSync(
		path.join("posts", slug + ".md"),
		"utf-8"
	);
	const { data: frontmatter, content } = matter(markdownWithMeta);
	return {
		props: { frontmatter, content, slug },
	};
}
