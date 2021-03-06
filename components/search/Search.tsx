import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { SearchOutlined } from "@ant-design/icons";
import SearchResults from "../searchResults/SearchResults";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const getResults = async () => {
			if (searchTerm === "") {
				setSearchResults([]);
			} else {
				const res = await fetch(`/api/search?q=${searchTerm}`);
				const { results } = await res.json();
				setSearchResults(results);
			}
		};
		getResults();
	}, [searchTerm]);

	return (
		<Row className={styles["search-container"]}>
			<Col span={24}>
				<Row>
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
										onChange={(e) =>
											setSearchTerm(e.target.value)
										}
										placeholder="Search Posts..."
										autoComplete="off"
										className={styles["search-input"]}
									/>
									<SearchOutlined
										className={styles["search-icon"]}
									/>
								</form>
							</Col>
						</Row>
					</Col>
					<Col span={1}></Col>
				</Row>
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<SearchResults results={searchResults} />
					</Col>
					<Col span={1}></Col>
				</Row>
			</Col>
		</Row>
	);
};

export default Search;
