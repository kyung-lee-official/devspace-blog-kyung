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

const CategoryBlogPage: NextPage<any> = ({ posts, categoryName }: any) => {
	return (
		<Layout>
			<h1>Post in {categoryName}</h1>
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

export default CategoryBlogPage;

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join("posts"));
	const categories = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join("posts", filename),
			"utf-8"
		);
		const { data: frontmatter } = matter(markdownWithMeta);
		return frontmatter.category.toLowerCase();
	});

	const paths = categories.map((category) => ({
		params: { category_name: category },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { category_name } }: any) {
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

	// Filter posts by category
	const categoryPosts = posts.filter(
		(post) => post.frontmatter.category.toLowerCase() === category_name
	);

	return {
		props: {
			posts: categoryPosts.sort(sortByDate),
			categoryName: category_name,
		},
	};
}
