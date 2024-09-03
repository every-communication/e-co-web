import { Suspense } from "react";

import SolidPrimaryButton from "@/components/Common/Button/SolidPrimaryButton";
import Input from "@/components/Common/Input";

import UserList from "./UserList";

import styles from "./homePage.module.scss";

const HomePage: React.FC = () => {
	return (
		<main className={styles.wrapper}>
			<h1>Home Page</h1>
			<h2>Input</h2>
			<Input type="text" inputMode="none" label="Input" helpText="helpText" />
			<SolidPrimaryButton size="large" type="button">
				BUTTON
			</SolidPrimaryButton>
			<Suspense fallback={<>LOADING...</>}>
				<UserList />
			</Suspense>
		</main>
	);
};

export default HomePage;
