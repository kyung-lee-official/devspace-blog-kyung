import Post from "../post/Post";
import styles from "./SearchResults.module.css";

const SearchResults = ({ results }: any) => {
	if (results.length === 0) {
		return <></>;
	}
	return (
		<div className={styles["result-container"]}>
			<h3 className={styles["h3"]}>{results.length} Results</h3>
			{results.map((result: any, index: number) => (
				<Post key={index} post={result} compact={true} />
			))}
		</div>
	);
};

export default SearchResults;
