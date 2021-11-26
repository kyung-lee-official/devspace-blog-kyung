import { List } from "antd";
import CategoryLable from "../categoryLable/CategoryLable";

const CategoryList = ({ categories }: any) => {
	return (
		<List header={<h2>Blog Categories</h2>}>
			{categories.map((category: any) => (
				<List.Item key={category}>
					<CategoryLable>{category}</CategoryLable>
				</List.Item>
			))}
		</List>
	);
};

export default CategoryList;
