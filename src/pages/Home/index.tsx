// import styles from "./homePage.module.scss";

import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import { useMe } from "@/hooks";

const HomePage: React.FC = () => {
	const { logout } = useMe();

	return (
		<>
			home!
			<TextPrimaryButton size="medium" type="button" onClick={logout}>
				임시 로그아웃
			</TextPrimaryButton>
		</>
	);
};

export default HomePage;
