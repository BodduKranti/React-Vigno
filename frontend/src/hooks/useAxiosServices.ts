
import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { AxiosFormData, AxiosInstance } from "../services";


// Request configuration
interface ApiVariables {
    URL: string;
    payload?: unknown;
    params?: Record<string, unknown>;
}

const apiRequestFormdata = async <T,>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    URL: string,
    payload?: unknown,
    params?: Record<string, unknown>
): Promise<T> => {
    const response = await AxiosFormData.request<T>({
        method,
        url: URL,
        data: payload,
        params,
        withCredentials: true,
    });

    return response.data;
};

// Generic API request function
const apiRequest = async <T,>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    URL: string,
    payload?: unknown,
    params?: Record<string, unknown>
): Promise<T> => {
    const response = await AxiosInstance.request<T>({
        method,
        url: URL,
        data: payload,
        params,
        withCredentials: true,
    });

    return response.data;
};

// GET API
export const useGetApi = <T,>(
    URL: string,
    params?: Record<string, unknown>,
    enabled = true
) => {
    return useQuery<T, Error>({
        queryKey: [URL, params],
        queryFn: () => apiRequest<T>("GET", URL, undefined, params,),
        enabled,
    });
};

// POST API
export const usePostApi = <T,>() => {
    return useMutation<T, Error, ApiVariables>({
        mutationFn: ({ URL, payload }) =>
            apiRequest<T>("POST", URL, payload),
    });
};

// PUT API - replace/update a resource
export const usePutApi = <T,>() => {
    return useMutation<T, Error, ApiVariables>({
        mutationFn: ({ URL, payload }) =>
            apiRequest<T>("PUT", URL, payload),
    });
};

// PATCH API - update selected fields
export const usePatchApi = <T,>() => {
    return useMutation<T, Error, ApiVariables>({
        mutationFn: ({ URL, payload }) =>
            apiRequest<T>("PATCH", URL, payload),
    });
};

// DELETE API
export const useDeleteApi = <T,>() => {
    return useMutation<T, Error, ApiVariables>({
        mutationFn: ({ URL, params }) =>
            apiRequest<T>("DELETE", URL, undefined, params),
    });
};


// Formdata
interface FormVariables {
    URL: string
    payload: FormData
}

export const usePostFormApi = <T,>() => {
    return useMutation<T, Error, FormVariables>({
        mutationFn: ({ URL, payload }) => apiRequestFormdata<T>("POST", URL, payload),
    })
}

// PUT API - replace/update a resource
export const usePutFormApi = <T,>() => {
    return useMutation<T, Error, ApiVariables>({
        mutationFn: ({ URL, payload }) => apiRequestFormdata<T>("PUT", URL, payload),
    });
};