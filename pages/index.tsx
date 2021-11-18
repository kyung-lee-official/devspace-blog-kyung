import fs from "fs";
import path from "path";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import matter from "gray-matter";

const HomePage: NextPage = () => {
	return (
		<Layout>
			<h1>Hello World</h1>
		</Layout>
	);
};

export default HomePage;

export async function getStaticProps() {
	const files = fs.readdirSync(path.join("posts"));
	const posts = files.map((filename) => {
		const slug = filename.replace(".md", "");

		return {
			slug,
		};
	});

	return {
		props: {},
	};
}
