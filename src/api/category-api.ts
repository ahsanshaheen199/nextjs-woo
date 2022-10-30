import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { Category } from '../types/Category';


export function getCategories ()  {
  const fetcher = async (queryKey: [string]) => {
    const [url] = queryKey;
    const response = await api.get(url);

    return response.data;
  };

  return useQuery<Category[], Error>({
    queryKey: ['products/categories'],
    queryFn: ( { queryKey } ) => fetcher(queryKey as [string])
  });
}