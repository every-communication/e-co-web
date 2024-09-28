import { type ChangeEventHandler, type FormEventHandler, startTransition, Suspense, useState } from "react";

import BaseModal from "@/components/Common/BaseModal";
import Input from "@/components/Common/Input";

import FriendList, { LoadingFriendList } from "./FriendList";

import styles from "./searchFriendModal.module.scss";

interface Props {
	isShow: boolean;
	onClose: () => void;
}

const SearchFriendModal: React.FC<Props> = ({ isShow, onClose }) => {
	const [input, setInput] = useState("");
	const [keyword, setKeyword] = useState("");

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value } = e.currentTarget;
		setInput(value);
	};

	const onClickClear = () => {
		setInput("");
		startTransition(() => {
			setKeyword("");
		});
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		startTransition(() => {
			setKeyword(input);
		});
	};

	return (
		<BaseModal
			isShow={isShow}
			onClose={onClose}
			blockCloseWhenClickOverlay
			title="친구 추가"
			className={styles.wrapper}
			contentClassName={styles.contentWrapper}
		>
			<form onSubmit={onSubmit}>
				<Input
					value={input}
					type="text"
					inputMode="none"
					onChange={onChange}
					onClickClearButton={onClickClear}
					placeholder="이메일 혹은 닉네임을 입력하세요."
					className={styles.searchInput}
				/>
			</form>
			<Suspense fallback={<LoadingFriendList />}>
				<FriendList keyword={keyword} />
			</Suspense>
		</BaseModal>
	);
};

export default SearchFriendModal;
