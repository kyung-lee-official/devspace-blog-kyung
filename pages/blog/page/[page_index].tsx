import fs from "fs";
import path from "path";
import Link from "next/link";
import type { NextPage } from "next";
import Layout from "../../../components/Layout";
import matter from "gray-matter";
import Post from "../../../components/post/Post";
import sortByDate from "../../../utils";
import { Col, Row } from "antd";
import { POST_PER_PAGE } from "../../../config/config";

const BlogPage: NextPage<any> = ({ posts, numPages, currnentPage }: any) => {
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

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join("posts"));
	const numPages = Math.ceil(files.length / POST_PER_PAGE);

	let paths = [];
	for (let i = 1; i <= numPages; i++) {
		paths.push({
			params: { page_index: i.toString() },
		});
	}

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	console.log(params.page_index);
	console.log("params.page_index");
	const page = parseInt((params && params.page_index) || 1);
	
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

	const numPages = Math.ceil(files.length / POST_PER_PAGE);
	const pageIndex = page - 1;
	const orderedPosts = posts
		.sort(sortByDate)
		.slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE);

	return {
		props: {
			posts: orderedPosts,
			numPages,
			currnentPage: page,
		},
	};
}
