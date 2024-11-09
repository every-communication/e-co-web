import { type ChangeEventHandler } from "react";

import { USER_TYPE_MAPPER } from "@/common/constants/user";
import type { UserInfoDTO, UserType } from "@/common/types/users";
import UserTypeChecker from "@/components/User/UserTypeChecker";
import { useMe, useToast } from "@/hooks";
import useDebounceCallback from "@/hooks/useDebounceCallback";
import { useUpdateMeMutation } from "@/queries/users/mutations";
import { useMeStore } from "@/zustand/me";

// FIXME: 정보 수정 기능
const UserType: React.FC = () => {
	const { me, refetchMe } = useMe();
	const { addToast } = useToast();

	const { setMe } = useMeStore();
	const { mutateAsync: updateMeMutation } = useUpdateMeMutation();

	const updateMe = async (data: UserInfoDTO) => {
		await updateMeMutation(data);
		await refetchMe();
	};

	const updateMeDebounce = useDebounceCallback(updateMe);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.currentTarget.value as UserType;
		setMe({ ...me, userType: value });
		updateMeDebounce({ ...me, userType: value });
		addToast({ message: `사용자 유형이 ${USER_TYPE_MAPPER[value]}(으)로 변경되었습니다.`, state: "positive" });
	};

	return <UserTypeChecker userType={me.userType} onChange={onChange} />;
};

export default UserType;
