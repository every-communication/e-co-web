import TextPrimaryButton from "@/components/Common/Button/TextPrimaryButton";
import Input from "@/components/Common/Input";

import styles from "./JoinRoom.module.scss";

// TODO: react hook form
const JoinRoom: React.FC = () => {
	return (
		<form className={styles.wrapper}>
			<Input placeholder="코드를 입력하세요" inputMode="text" type="text" className={styles.input} />
			<TextPrimaryButton type="button" size="medium">
				접속
			</TextPrimaryButton>
		</form>
	);
};

export default JoinRoom;
