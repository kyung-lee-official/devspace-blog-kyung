import { Avatar, Col, Row } from "antd";
import fs from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";
import path from "path";
import ReactMarkdown from "react-markdown";
import CategoryLable from "../../components/categoryLable/CategoryLable";
import Layout from "../../components/Layout";
import styles from "../../styles/BlogSlug.module.css";

const PostPage: NextPage = ({
	frontmatter: { title, category, date, cover_image, author, author_image },
	content,
	slug,
}: any) => {
	return (
		<Layout title={title}>
			<Link href="/blog">Go Back</Link>

			<div className={styles["content-container"]}>
				<Row justify="space-between" align="middle">
					<h1>{title}</h1>
					<CategoryLable>{category}</CategoryLable>
				</Row>
				<Row justify="center">
					<img
						src={cover_image}
						alt=""
						className={styles["cover-image"]}
					/>
				</Row>
				<Row justify="space-between" align="middle">
					<Col>
						<Row justify="space-between" align="middle">
							<Avatar size={64} src={author_image}></Avatar>
							<h4>{author}</h4>
						</Row>
					</Col>
					<Col>{date}</Col>
				</Row>
				<ReactMarkdown>{content}</ReactMarkdown>
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
