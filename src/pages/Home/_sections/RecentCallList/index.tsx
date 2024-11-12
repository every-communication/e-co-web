import { range } from "lodash-es";

import { useGetRoomHistoriesSuspenseQuery } from "@/queries/videoTelegraphy/queries";

import Item, { LoadingItem } from "./Item";
import Empty from "../Empty";
import Section from "../Section";

import styles from "./recentCallList.module.scss";

const RecentCallList: React.FC = () => {
	const { data: histories } = useGetRoomHistoriesSuspenseQuery().data;

	return (
		<Section title="최근 통화 목록" isFlexHeight>
			{histories.length > 0 && (
				<ul className={styles.wrapper}>
					{histories.map((history) => (
						<Item history={history} key={`${history.callTime}-${history.friendEmail}-${history.totalCallTime}`} />
					))}
				</ul>
			)}
			{histories.length === 0 && (
				<Empty title="최근 통화 목록이 없어요" description="방을 생성해서 통화를 시작해보세요" />
			)}
		</Section>
	);
};

export default RecentCallList;

export const LoadingRecentCallList: React.FC = () => {
	return (
		<Section title="최근 통화 목록" isFlexHeight>
			{range(5).map((value) => (
				<LoadingItem key={value} />
			))}
		</Section>
	);
};
