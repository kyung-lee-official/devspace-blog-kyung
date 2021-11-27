import Link from "next/link";
import styles from "./Header.module.css";
import { Row, Col, Grid } from "antd";

const { useBreakpoint } = Grid;
const Header = () => {
	const screens = useBreakpoint();

	return (
		<div className={styles["header"]}>
			{screens.md ? (
				<Row justify="space-between" align="middle" className={styles["header-row"]}>
					<Col offset={1} flex="auto">
						<Link href="/">
							<a className={styles["logo-image-link"]}>
								<img
									src="/images/logo.png"
									width={40}
									height={40}
									alt="logo"
								/>
								<span className={styles["logo-text"]}>
									DevSpace
								</span>
							</a>
						</Link>
					</Col>
					<Col flex={2}></Col>
					<Col className={styles["nav"]}>
						<Link href="/blog">
							<a className={styles["nav-items"]}>Blog</a>
						</Link>
						<Link href="/about">
							<a className={styles["nav-items"]}>About</a>
						</Link>
					</Col>
					<Col span={1}></Col>
				</Row>
			) : (
				<>
					<Row justify="center" align="middle" className={styles["header-row"]}>
						<Col className={styles["logo-container"]}>
							<Link href="/">
								<a className={styles["logo-image-link"]}>
									<img
										src="/images/logo.png"
										width={40}
										height={40}
										alt="logo"
									/>
									<span className={styles["logo-text"]}>
										DevSpace
									</span>
								</a>
							</Link>
						</Col>
					</Row>
					<Row justify="center">
						<Col className={styles["nav"]}>
							<Link href="/blog">
								<a className={styles["nav-items"]}>Blog</a>
							</Link>
						</Col>
						<div></div>
						<Col span={1}></Col>
					</Row>
					<Row justify="center">
						<Col className={styles["nav"]}>
							<Link href="/about">
								<a className={styles["nav-items"]}>About</a>
							</Link>
						</Col>
						<div></div>
						<Col span={1}></Col>
					</Row>
				</>
			)}
		</div>
	);
};

export default Header;
