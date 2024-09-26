// import styles from "./homePage.module.scss";

import { useMe } from "@/hooks";

const HomePage: React.FC = () => {
	const { refetchMe } = useMe();

	return (
		<>
			home!
			<button type="button" onClick={refetchMe}>
				refetchMe
			</button>
		</>
	);
};

export default HomePage;
