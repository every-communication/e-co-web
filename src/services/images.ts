import { apiClient } from "./apiClient";

/** 이미지 업로드
 * @param formData key: "image" value: File
 * */
export const uploadImageApi = (formData: FormData) => apiClient.post("images", { body: formData }).json();
