import Layout from "@/components/layout/Layout";
import { Row } from "antd";
import styles from "./404.module.css";

const NotFoundPage = () => {
	return (
		<Layout title="Page Not Found">
			<Row justify="center">
				<div className={styles["image-row"]}>
					<img src="/images/logo.png" width={70} height={70} alt="" />
				</div>
			</Row>
			<Row justify="center">
				<h1>Whoops!</h1>
			</Row>
			<Row justify="center">
				<h2>This page does not exist.</h2>
			</Row>
		</Layout>
	);
};

export default NotFoundPage;
