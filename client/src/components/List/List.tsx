import styles from './List.module.scss';
import ListItem from "../ListItem/ListItem.tsx";

type ListProps = {
	data: string[];
}

const List = ({ data }: ListProps) => {
	return (
		<ul className={styles.list}>
			{ data.map(item => <ListItem key={item} value={item}/>) }
		</ul>
	);
};

export default List;
