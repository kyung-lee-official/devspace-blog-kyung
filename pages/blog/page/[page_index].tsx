import fs from "fs";
import path from "path";
import Link from "next/link";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import matter from "gray-matter";
import Post from "@/components/post/Post";
import sortByDate from "@/utils/index";
import { Col, Pagination, Row } from "antd";
import { POST_PER_PAGE } from "@/config/config";
import { useRouter } from "next/dist/client/router";
import styles from "./PageIndex.module.css";

const BlogPage: NextPage<any> = ({
	posts,
	numPages,
	currnentPage,
	fileLength,
}: any) => {
	const router = useRouter();

	return (
		<Layout>
			<h1>Blog</h1>
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
			<Row justify="center" className={styles["row-container"]}>
				<Pagination
					defaultCurrent={currnentPage}
					total={fileLength}
					pageSize={POST_PER_PAGE}
					onChange={(pageNumber: any) => {
						router.push(`/blog/page/${pageNumber}`);
						return;
					}}
				/>
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
			// For antd
			fileLength: files.length,
		},
	};
}
