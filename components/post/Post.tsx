import { Typography, Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import CategoryLable from "../categoryLable/CategoryLable";
import styles from "./Post.module.css";

const Post = ({ post, compact }: { post: any; compact: boolean }) => {
	const { Text } = Typography;
	return (
		<div className={styles["post-card"]}>
			{!compact && (
				<img
					src={post.frontmatter.cover_image}
					alt=""
					width={"100%"}
					className={styles.image}
				/>
			)}

			<Row justify="space-between">
				<span>{post.frontmatter.date}</span>
				<CategoryLable>{post.frontmatter.category}</CategoryLable>
			</Row>
			<Title level={2}>
				<Link href={`/blog/${post.slug}`}>
					<div className={styles["title-link"]}>
						{post.frontmatter.title}
					</div>
				</Link>
			</Title>
			<div>
				<p>{post.frontmatter.excerpt}</p>
			</div>
			{!compact && (
				<Row justify="space-between">
					<Col>
						<Link href={`/blog/${post.slug}`}>
							<a>Read More</a>
						</Link>
					</Col>
					<Col>
						<Row gutter={16} align="middle">
							<Avatar
								size={64}
								src={post.frontmatter.author_image}
							></Avatar>
							<Text strong className={styles["author"]}>
								{post.frontmatter.author}
							</Text>
						</Row>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default Post;
