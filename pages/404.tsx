import Layout from "@/components/layout/Layout";
import Image from "next/image";

const NotFoundPage = () => {
	return (
		<Layout title="Page Not Found">
			<div>
				<Image
					src="/images/logo.png"
					width={70}
					height={70}
				/>
				<h1>Whoops!</h1>
				<h2>
					This page does not exist.
				</h2>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
