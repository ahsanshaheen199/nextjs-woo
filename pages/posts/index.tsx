import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetPosts } from '../../src/api/blog-api';
import Layout from '../../src/components/Layout';
import PostLoader from '../../src/components/shared/PostLoader';
import Pagination from '../../src/components/shop/Pagination';

type Props = {}

const Blog = (props: Props) => {
  const { query } = useRouter();
  const { isLoading, data } = useGetPosts(query);
  
  return (
    <>
      <Head>
        <title>Nextjs Woo | Blog</title>
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
              isLoading ? (
                <PostLoader />
              ) : data.posts && data.posts.map( post => {
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
                      <h2 className='font-medium text-2xl text-black mb-1 hover:text-primary'><Link href={`/post/${post.id}`}><a>{post.title.rendered}</a></Link></h2>
                      <p className='text-sm text-[#676767]'>
                        {date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}
                      </p>
                    </div>
                  </div>
                );
              } )
            }    
          </div>
          {data && data.posts.length > 1 && parseInt(data.headers['x-wp-totalpages']) > 1 && <Pagination count={parseInt(data.headers['x-wp-totalpages'])} />}
        </div>
      </Layout>
    </>
  );
};

export default Blog;