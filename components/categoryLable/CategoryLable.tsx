import { Tag } from "antd";
import Link from "next/link";

const CategoryLable = ({ children }: { children: any }) => {
	const colorKey = {
		JavaScript: "gold",
		CSS: "blue",
		Python: "green",
		PHP: "purple",
		Ruby: "red",
	} as any;

	return (
		<Tag color={colorKey[children]}>
			<Link href={`/blog/category/${children.toLowerCase()}`}>
				{children}
			</Link>
		</Tag>
	);
};

export default CategoryLable;
