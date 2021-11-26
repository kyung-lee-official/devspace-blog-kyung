import fs from "fs";
import path from "path";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import matter from "gray-matter";
import Post from "@/components/post/Post";
import { Col, Row } from "antd";
import { getPosts } from "@/lib/posts";
import CategoryList from "@/components/categoryList/CategoryList";

const CategoryBlogPage: NextPage<any> = ({
	posts,
	categoryName,
	categories,
}: any) => {
	return (
		<Layout>
			<Row>
				<Col span={17}>
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
				</Col>
				<Col span={6} offset={1}>
					<CategoryList categories={categories}/>
				</Col>
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
	const posts = getPosts();

	// Get categories for sidebar
	const categories = posts.map((post) => post.frontmatter.category);
	const uniqueCategories = [...new Set(categories)];

	// Filter posts by category
	const categoryPosts = posts.filter(
		(post) => post.frontmatter.category.toLowerCase() === category_name
	);

	return {
		props: {
			posts: categoryPosts,
			categoryName: category_name,
			categories: uniqueCategories,
		},
	};
}
