import styles from "./item.module.scss";

interface Props {}

const Item: React.FC = () => {
	return <li className={styles.wrapper}></li>;
};

export default Item;
