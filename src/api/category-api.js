import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";


export function getCategories ()  {
    const fetcher = async () => {
        const response = await api.get('products/categories');

        return response.data;
    }

    return useQuery(['cateogryList'],fetcher);
}