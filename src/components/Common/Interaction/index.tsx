import cx from "clsx";

import { getSemanticColor } from "@/utils/style";

import styles from "./interaction.module.scss";

type Variant = "normal" | "light" | "strong";

interface Props {
	variant: Variant;
	backgroundColor: string;
	disabled?: boolean;
}

const Interaction: React.FC<Props> = ({ variant, backgroundColor: backgroundColorProp, disabled }) => {
	const backgroundColor = getSemanticColor(backgroundColorProp);

	return <span className={cx(styles.wrapper, styles[variant])} style={{ backgroundColor }} aria-disabled={disabled} />;
};

export default Interaction;
