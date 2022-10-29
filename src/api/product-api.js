import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios"


export function getProducts(queryParams = {}) {
    const fetcher = async (queryKey) => {
        const response = await api.get(queryKey[0],{params: queryKey[1]});

        return response.data;
    }

    return useQuery({
        queryKey: ['products',queryParams],
        queryFn: ( { queryKey } ) => fetcher(queryKey)
    });
}