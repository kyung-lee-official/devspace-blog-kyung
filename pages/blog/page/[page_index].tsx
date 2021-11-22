import fs from "fs";
import path from "path";
import Link from "next/link";
import type { NextPage } from "next";
import Layout from "../../../components/Layout";
import matter from "gray-matter";
import Post from "../../../components/post/Post";
import sortByDate from "../../../utils";
import { Col, Row } from "antd";

const BlogPage: NextPage<any> = ({ posts }: { posts: any }) => {
	return (
		<Layout>
			<h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
			<Row gutter={[16, 16]}>
				{posts.map((post: any, index: number) => (
					<Col
						sm={{ span: 24 }}
						md={{ span: 12 }}
						lg={{ span: 8 }}
						key={"col-key-" + index}
					>
						<Post key={index} post={post}></Post>
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default BlogPage;

export async function getStaticProps() {
	const files = fs.readdirSync(path.join("posts"));
	const posts = files.map((filename) => {
		const slug = filename.replace(".md", "");
		const markdownWithMeta = fs.readFileSync(
			path.join("posts", filename),
			"utf-8"
		);
		const { data: frontmatter } = matter(markdownWithMeta);

		return {
			slug,
			frontmatter,
		};
	});

	return {
		props: {
			posts: posts.sort(sortByDate),
		},
	};
}
