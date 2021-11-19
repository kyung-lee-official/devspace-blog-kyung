import Link from "next/link";

const CategoryLable = ({ children }: { children: any }) => {
	const colorKey = {
		JavaScript: "yellow",
		CSS: "blue",
		Python: "green",
		PHP: "purple",
		Ruby: "Red",
	} as any;

	return (
		<div
			className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
		>
			<Link href={`/blog/category/${children.toLowerCase()}`}>
				{children}
			</Link>
		</div>
	);
};

export default CategoryLable;
