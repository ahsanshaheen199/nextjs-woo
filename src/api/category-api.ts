import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '../lib/axios';
import { Category, CategoryTree } from '../types/Category';
import ArrayToTree from 'array-to-tree';

export function getCategories(per_page: number = 10) {
  const fetcher = async (queryKey: [string, number]) => {
    const [url, perPage] = queryKey;
    const response = await api.get(url, {
      params: {
        per_page: perPage,
      },
    });

    return response.data;
  };

  return useQuery<Category[], Error>({
    queryKey: ['products/categories', per_page],
    queryFn: ({ queryKey }) => fetcher(queryKey as [string, number]),
  });
}

export function getCategoriesTree() {
  const fetcher = async (queryKey: [string]) => {
    const [url] = queryKey;
    const response = await api.get(url);

    return response.data;
  };

  return useQuery<Category[], Error, CategoryTree[]>({
    queryKey: ['products/categories'],
    queryFn: ({ queryKey }) => fetcher(queryKey as [string]),
    select: (data: Category[]) => {
      return ArrayToTree(data, {
        parentProperty: 'parent',
      }) as CategoryTree[];
    },
  });
}

export function useCategoryById(id: string, queryConfig: Omit<UseQueryOptions<Category, Error>, 'queryKey' | 'queryFn'> = {}) {
  const fetcher = async (queryKey: [string, string]) => {
    const [url, id] = queryKey;

    const response = await api.get(`${url}/${id}`);

    return response.data;
  };

  return useQuery<Category, Error>({
    queryKey: ['products/categories', id],
    queryFn: ({ queryKey }) => fetcher(queryKey as [string, string]),
    ...queryConfig
  });
}
