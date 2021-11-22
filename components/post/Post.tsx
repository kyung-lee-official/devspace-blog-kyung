import { Typography, Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Image from "next/image";
import Link from "next/link";
import CategoryLable from "../categoryLable/CategoryLable";
import styles from "./Post.module.css";

const Post = ({ post }: { post: any }) => {
	const { Text } = Typography;
	return (
		<div className={styles["post-card"]}>
			<Image
				src={post.frontmatter.cover_image}
				alt=""
				height={420}
				width={600}
				className={styles.image}
			/>
			<Row justify="space-between">
				<span>
					{post.frontmatter.date}
				</span>
				<CategoryLable>{post.frontmatter.category}</CategoryLable>
			</Row>
			<Title level={2}>
				<Link href={`/blog/${post.slug}`}>
					{post.frontmatter.title}
				</Link>
			</Title>
			<div>
				<p>{post.frontmatter.excerpt}</p>
			</div>
			<Row justify="space-between">
				<Col>
					<Link href={`/blog/${post.slug}`}>
						<a>
							Read More
						</a>
					</Link>
				</Col>
				<Col>
					<Row gutter={16} align="middle">
						<Avatar size={64} src={post.frontmatter.author_image}></Avatar>
						<Text strong className={styles["author"]}>{post.frontmatter.author}</Text>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default Post;
