import Link from "next/link";
import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Post from "@/components/post/Post";
import { Col, Row } from "antd";
import styles from "./index.module.css";
import { getPosts } from "@/lib/posts";

const HomePage: NextPage<any> = ({ posts }: { posts: any }) => {
	return (
		<Layout>
			<h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
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

export default HomePage;

export async function getStaticProps() {
	return {
		props: {
			posts: getPosts().slice(0, 6),
		},
	};
}
