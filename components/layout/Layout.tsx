import Head from "next/head";
import Header from "../header/Header";
import { Content } from "antd/lib/layout/layout";
import { Col, Row } from "antd";
import Search from "../search/Search";

const Layout = ({
	title,
	keywords,
	description,
	children,
}: {
	title: string | null;
	keywords: string;
	description: string;
	children: any;
}) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Search />
			<Content>
				<Row justify="center">
					<Col span={22}>{children}</Col>
				</Row>
			</Content>
		</div>
	);
};

Layout.defaultProps = {
	title: "Welcome to DevSpace",
	keywords: "development, coding, programming",
	description: "The best info and news in developments.",
};

export default Layout;
