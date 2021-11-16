import Head from "next/head";

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
			<main>{children}</main>
		</div>
	);
};

Layout.defaultProps = {
	title: "Welcome to DevSpace",
	keywords: "development, coding, programming",
	description: "The best info and news in developments."
}

export default Layout;