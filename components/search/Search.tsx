import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState("");

	const onSearch = () => {};

	return (
		<Row className={styles["search-container"]}>
			<Col span={1}></Col>
			<Col span={22}>
				<Row justify="end">
					<Col>
						<form>
							<input
								type="search"
								name="search"
								id="search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search Posts..."
								className={styles["search-input"]}
							/>
							<SearchOutlined className={styles["search-icon"]}/>
						</form>
					</Col>
				</Row>
			</Col>
			<Col span={1}></Col>
		</Row>
	);
};

export default Search;
