import axios from "axios";

export const ErrorAxios = (error: any) => {
    if (axios.isAxiosError(error)) {
        const message =
            error.response?.data?.message ||
            "Something went wrong!";

        console.log(message);
        return message
    } else {
        console.log("An unexpected error occurred.");
        let message = "An unexpected error occurred."
        return message
    }
}