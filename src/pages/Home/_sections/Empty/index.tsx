import { IconCall } from "@/assets/icons/layout";
import CommonEmpty from "@/components/Common/CommonEmpty";

import styles from "./empty.module.scss";

interface Props {
	title: string;
	description: string;
}

const Empty: React.FC<Props> = ({ description, title }) => {
	return (
		<div className={styles.wrapper}>
			<CommonEmpty icon={<IconCall className={styles.emptyIcon} />} title={title} description={description} />
		</div>
	);
};

export default Empty;
