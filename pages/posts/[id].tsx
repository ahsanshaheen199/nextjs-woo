import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useGetPostsExcludingCurrentPost } from '../../src/api/blog-api';
import Layout from '../../src/components/Layout';
import api from '../../src/lib/axios';
import { Post } from '../../src/types/Post';
import Image from 'next/image';
import RelatedPostLoader from '../../src/components/shared/RelatedPostLoader';

type Props = {
  post: Post
}

const BlogDetails: NextPage = ({post}: Props) => {
  const { isLoading, data: allPostsExcludingCurrentPost } = useGetPostsExcludingCurrentPost(post.id.toString(), {
    enabled: !! post.id
  });
  const mainPostDate = new Date(post.modified);
  return (
    <>
      <Head>
        <title>
          <>
            {
              post?.title ? post.title.rendered : 'Next.js Woo Blog Example'
            }
          </>
        </title>
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
              <li className="text-xs text-[#676767]">/</li>
              <li className="text-xs text-[#676767]">{post?.title?.rendered}</li>
            </ul>
          </div>

          <div className='grid lg:grid-cols-4 lg:gap-8'>
            <div className="lg:col-span-3">
              <h2 className="text-[40px] leading-[auto] font-light mb-10">Blog Details</h2>
              <div className=''>
                {
                  post.featured_media === 0 ? (
                    <div>
                      <Image width={800} height={300} src={'/blog-list.jpg'} alt={post.title.rendered} />
                    </div>
                  ) : (
                    post._embedded.hasOwnProperty('wp:featuredmedia') && <div><Image width={850} height={300} src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} /></div>
                  )
                }
                <div className='text-center mt-10 mb-8'>
                  <h1 className='text-2xl font-medium text-black mb-2'>{post.title.rendered}</h1>
                  <p className='text-sm text-[#676767]'>
                    {mainPostDate.getDate() + '.' + (mainPostDate.getMonth() + 1) + '.' + mainPostDate.getFullYear()}
                  </p>
                </div>
                <div className='blog-details-content' dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-[40px] leading-[auto] font-light mb-10">All Post</h2>
              <div>
                {
                  isLoading ? (
                    <RelatedPostLoader count={4} />
                  ) : (
                    allPostsExcludingCurrentPost.map( p => {
                      const date = new Date(p.modified);
                      return (
                        <div key={p.id} className="mb-8">
                          {
                            p.featured_media === 0 ? (
                              <div className='mb-6'>
                                <Image width={400} height={300} src={'/blog-list.jpg'} alt={p.title.rendered} />
                              </div>
                            ) : (
                              p._embedded.hasOwnProperty('wp:featuredmedia') && <div className='mb-6'><Image width={400} height={300} src={p._embedded['wp:featuredmedia'][0].source_url} alt={p.title.rendered} /></div>
                            )
                          }
                          <div className='text-center px-4'>
                            <h2 className='font-medium text-lg text-black mb-1 hover:text-primary'><Link href={`/posts/${p.id}`}><a>{p.title.rendered}</a></Link></h2>
                            <p className='text-sm text-[#676767]'>
                              {date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}
                            </p>
                          </div>
                        </div>
                      );
                    } )
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogDetails;

export const getStaticProps : GetStaticProps = async (context) => {

  try {
    const response = await api.get(`/posts/${context.params.id}?_embed`, {
      baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wp/v2'
    });

    return {
      props: {
        post: response.data
      },
      revalidate: 60
    };
  } catch( error ) {
    return {
      notFound: true
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/posts', {
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wp/v2'
  });

  const posts = response.data;

  const paths = posts.map( post => {
    return {
      params: {
        id: `${post.id}`
      },
    };
  } );

  return {
    paths,
    fallback: true
  };
};