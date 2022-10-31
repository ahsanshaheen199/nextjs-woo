import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { Category, CategoryTree } from '../types/Category';
import ArrayToTree from 'array-to-tree';

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

export function getCategoriesTree ()  {
  const fetcher = async (queryKey: [string]) => {
    const [url] = queryKey;
    const response = await api.get(url);

    return response.data;
  };

  return useQuery<Category[], Error, CategoryTree[]>({
    queryKey: ['products/categories'],
    queryFn: ( { queryKey } ) => fetcher(queryKey as [string]),
    select: (data: Category[]) => {
      return ArrayToTree(data, {
        parentProperty: 'parent',
      }) as CategoryTree[]
    },
  });
}

export function useCategoryById(id: string) {

  const fetcher = async (queryKey: [string, string]) => {
    const [url,id] = queryKey;
    

    const response = await api.get(`${url}/${id}`);

    return response.data;
  }

  return useQuery<Category,Error>({
    queryKey: ['products/categories',id],
    queryFn: ( { queryKey } ) => fetcher(queryKey as [string, string])
  })
}