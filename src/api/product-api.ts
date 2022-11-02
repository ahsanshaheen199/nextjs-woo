import { useQuery } from '@tanstack/react-query';
import { AxiosResponse, AxiosResponseHeaders } from 'axios';
import api from '../lib/axios';
import { Product } from '../types/Product';

type ProductApiResponseProps = {
  products: Product[],
  headers: AxiosResponseHeaders
}


export function getProducts(queryParamas) {
  const fetcher = async (queryKey) => {
    const response = await api.get(queryKey[0], {
      params: queryParamas
    });    

    return { products: response.data, headers: response.headers };
  };

  return useQuery<ProductApiResponseProps, Error>({
    queryKey: ['products',queryParamas],
    queryFn: ( { queryKey } ) => fetcher(queryKey)
  });
}

export function getProduct(id: string) {

  const fetcher = async (queryKey: [string, string]) => {
    const [url,id] = queryKey;
    const response = await api.get(`${url}/${id}`);
    return response.data;
  };

  return useQuery<Product, Error>({
    queryKey: ['products',id],
    queryFn: ( { queryKey } ) => fetcher(queryKey as [string, string])
  });
}

export function useProductByCategory(id: string) {
  const fetcher = async (queryKey: [string, string]) => {
    const [url, id] = queryKey;

    const response = await api.get(url, {
      params: {
        category: id
      }
    });

    return response.data;
  };
  return useQuery<Product[], Error>({
    queryKey: ['products',id],
    queryFn: ({ queryKey }) => fetcher(queryKey as [string, string])
  });
}