import { Suspense } from "react";

import UserList from "./UserList";

import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1>Home Page</h1>
			<Suspense fallback={<>LOADING...</>}>
				<UserList />
			</Suspense>
		</main>
	);
};

export default HomePage;
