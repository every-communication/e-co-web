import { useGetRequestedVideoTelegraphyNotificationsSuspenseQuery } from "@/queries/notifications/queries";

import Item from "./Item";
import Empty from "../Empty";
import Section from "../Section";

import styles from "./invitedCallList.module.scss";

const InvitedCallList: React.FC = () => {
	const { data } = useGetRequestedVideoTelegraphyNotificationsSuspenseQuery().data;

	return (
		<Section title={`초대 목록 ${data.length}건`} isFlexHeight>
			{data.length > 0 && (
				<ul className={styles.wrapper}>
					{data.map((item) => (
						<Item key={item.notificationId} item={item} />
					))}
				</ul>
			)}
			{data.length === 0 && (
				<Empty title="초대받은 내역이 없어요" description="방 코드를 직접 입력해서 접속할 수 있어요" />
			)}
		</Section>
	);
};

export default InvitedCallList;
