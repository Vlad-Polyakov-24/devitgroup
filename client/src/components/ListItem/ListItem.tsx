import styles from './ListItem.module.scss';

type ListItemProps = {
	value: string;
}

const ListItem = (props: ListItemProps) => {
	const {
		value,
	} = props;

	return (
		<li className={styles.item}>{value}</li>
	);
};

export default ListItem;
