import styles from "./loading.module.scss";

interface Props {
	view: boolean;
}

const Loading: React.FC<Props> = ({ view }) => {
	if (!view) return null;
	return <div className={styles.wrapper} />;
};

export default Loading;
