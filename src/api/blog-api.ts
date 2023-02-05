import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponseHeaders } from 'axios';
import api from '../lib/axios';
import { Media, Post } from '../types/Post';

type PostsApiResponseProps = {
  posts: Post[];
  headers: AxiosResponseHeaders;
};

export function useGetPosts(queryParamas, queryConfig: Omit<UseQueryOptions<PostsApiResponseProps, Error>, 'queryKey' | 'queryFn'> = {}) {
  const fetcher = async (queryKey) => {

    const response = await api.get(`${queryKey[0]}?_embed`, {
      params: {...queryParamas},
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wp/v2'
    });

    return { posts: response.data, headers: response.headers };
  };

  return useQuery<PostsApiResponseProps, Error>({
    queryKey: ['/posts', queryParamas],
    queryFn: ({ queryKey }) => fetcher(queryKey),
    ...queryConfig
  });
}

export function useGetPostsExcludingCurrentPost(id: string, queryConfig: Omit<UseQueryOptions<Post[], Error>, 'queryKey' | 'queryFn'> = {}) {
  const fetcher = async (queryKey: [string, string]) => {
    const response = await api.get(`${queryKey[0]}?_embed`, {
      params: {exclude : [queryKey[1]], per_page: 4},
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wp/v2'
    });

    return response.data;
  };

  return useQuery<Post[], Error>({
    queryKey: ['/posts', id],
    queryFn: ({ queryKey }) => fetcher(queryKey as [string, string]),
    useErrorBoundary: true,
    ...queryConfig
  });
}