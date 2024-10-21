import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import { useMe } from "@/hooks";

import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
	const { logout } = useMe();

	return <main className={styles.wrapper}></main>;
};

export default HomePage;
