import fs from "fs";
import path from "path";
import Link from "next/link";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import matter from "gray-matter";
import Post from "@/components/post/Post";
import sortByDate from "@/utils/index";
import { Col, Row } from "antd";
import styles from "./CategoryName.module.css";

const CategoryBlogPage: NextPage<any> = ({ posts }: { posts: any }) => {
	return (
		<Layout>
			<h1>Latest Posts</h1>
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
			<Row justify="center" align="middle">
				<Link href="/blog">
					<Col span={22} className={styles["all-post-button"]}>
						All Posts
					</Col>
				</Link>
			</Row>
		</Layout>
	);
};

export default CategoryBlogPage;

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
			posts: posts.sort(sortByDate).slice(0, 6),
		},
	};
}
