import { ApiResponse } from "types/infrastructure/ApiResponse";

export const getApiResponse = async (response: Response) => {
    const responseData = await response.json();
    const result: ApiResponse = {
        data: responseData.data,
        isSucceed: response.ok && responseData.status.code === 0
    };

    return result;
}