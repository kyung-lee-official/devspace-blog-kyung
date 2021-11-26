import fs from "fs";
import path from "path";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Post from "@/components/post/Post";
import { Col, Pagination, Row } from "antd";
import { POST_PER_PAGE } from "@/config/config";
import { useRouter } from "next/dist/client/router";
import styles from "./PageIndex.module.css";
import { getPosts } from "@/lib/posts";

const BlogPage: NextPage<any> = ({
	posts,
	numPages,
	currnentPage,
	categories,
	fileLength,
}: any) => {
	const router = useRouter();

	return (
		<Layout>
			<Row>
				<Col span={18}>
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
				</Col>
				<Col span={6}></Col>
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
	const posts = getPosts();

	// Get categories for sidebar
	const categories = posts.map((post) => post.frontmatter.category);
	const uniqueCategories = [...new Set(categories)];

	const numPages = Math.ceil(files.length / POST_PER_PAGE);
	const pageIndex = page - 1;
	const orderedPosts = posts.slice(
		pageIndex * POST_PER_PAGE,
		(pageIndex + 1) * POST_PER_PAGE
	);

	return {
		props: {
			posts: orderedPosts,
			numPages,
			currnentPage: page,
			categories: uniqueCategories,
			// For antd
			fileLength: files.length,
		},
	};
}
