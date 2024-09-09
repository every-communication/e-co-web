export interface ApiResponseDTO<T> {
	status: number;
	message: string;
	data: T;
}

export type ErrorDTO = ApiResponseDTO<null>;
