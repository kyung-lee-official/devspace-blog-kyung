import fs from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";
import path from "path";
import Layout from "../../components/Layout";

const PostPage: NextPage = ({
	frontmatter: { title, category, date, cover_image, author, author_image },
	content,
	slug,
}: any) => {
	return (
		<Layout title={title}>
			<Link href="/blog">Go Back</Link>
			<div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
				<div className="flex justify-between items-center mt-4">
					<h1 className="text-5xl mb-7">{title}</h1>
				</div>
			</div>
		</Layout>
	);
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
