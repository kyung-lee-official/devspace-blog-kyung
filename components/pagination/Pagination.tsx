import Link from "next/link";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, numPages }: any) => {
	const isFirst = currentPage === 1;
	const isLast = currentPage === numPages;
	const prevPage = `/blog/page/${currentPage - 1}`;
	const nextPage = `/blog/page/${currentPage + 1}`;

	if (numPages === 1) {
		// Show nothing if there is only one page.
		return <></>;
	}

	return (
		<div className={styles["pagination-container"]}>
			<ul className={styles["pagination-ul"]}>
				{!isFirst && (
					<Link href={prevPage}>
						<li className={styles["pagination-li"]}>Previous</li>
					</Link>
				)}

				{Array.from({ length: numPages }, (_, i) => (
					<Link href={`/blog/page/${i + 1}`}>
						<li className={styles["pagination-li"]}>{i + 1}</li>
					</Link>
				))}

				{!isLast && (
					<Link href={nextPage}>
						<li className={styles["pagination-li"]}>Next</li>
					</Link>
				)}
			</ul>
		</div>
	);
};

export default Pagination;
