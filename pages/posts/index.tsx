import { AxiosResponseHeaders } from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useGetPosts } from '../../src/api/blog-api';
import Layout from '../../src/components/Layout';
import PostLoader from '../../src/components/shared/PostLoader';
import Pagination from '../../src/components/shop/Pagination';
import api from '../../src/lib/axios';
import { Post } from '../../src/types/Post';

type Props = {
  posts: Post[];
  headers: AxiosResponseHeaders;
}

const Blog = ({posts, headers}: Props) => {
  const [postList, setPosts] = useState<Post[]>(posts);
  const { query } = useRouter();
  const { data, isFetching } = useGetPosts(query, {
    enabled: !! query?.page
  });

  useEffect( () => {
    if( data ) {
      setPosts(data?.posts);
    }
  }, [data] );
  
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <Layout>
        <div className="pb-[120px]">
          <div className="mt-7 mb-5">
            <ul className="flex items-center space-x-2">
              <li className="text-xs text-[#676767]">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="text-xs text-[#676767]">/</li>
              <li className="text-xs text-[#676767]">Blog</li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-[40px] leading-[auto]">Blog</h2>
          </div>

          <div className='grid grid-cols-3 gap-1'>
            {
              isFetching ? (
                <PostLoader />
              ) :
                postList?.map( post => {
                  const date = new Date(post.modified);
                  return (
                    <div key={post.id} className="mb-8">
                      {
                        post.featured_media === 0 ? (
                          <div className='mb-6'>
                            <Image width={400} height={300} src={'/blog-list.jpg'} alt={post.title.rendered} />
                          </div>
                        ) : (
                          post._embedded.hasOwnProperty('wp:featuredmedia') && <div className='mb-6'><Image width={400} height={300} src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} /></div>
                        )
                      }
                      <div className='text-center px-10'>
                        <h2 className='font-medium text-2xl text-black mb-1 hover:text-primary'><Link href={`/posts/${post.id}`}><a>{post.title.rendered}</a></Link></h2>
                        <p className='text-sm text-[#676767]'>
                          {date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}
                        </p>
                      </div>
                    </div>
                  );
                } )
            }    
          </div>
          {parseInt(headers['x-wp-totalpages']) > 1 && <Pagination count={parseInt(headers['x-wp-totalpages'])} />}
        </div>
      </Layout>
    </>
  );
};

export default Blog;

export const getStaticProps : GetStaticProps = async () => {
  try {
    const response = await api.get('/posts?_embed', {
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wp/v2',
    });
  
    return {
      props: {
        posts: response.data,
        headers: response.headers
      },
      revalidate: 60
    };
  } catch(error) {
    return {
      notFound: true
    };
  }
};