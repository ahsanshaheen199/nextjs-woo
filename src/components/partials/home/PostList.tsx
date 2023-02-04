import React from 'react';
import { useGetPosts } from '../../../api/blog-api';
import PostLoader from '../../shared/PostLoader';
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

const PostList = (props: Props) => {
  const { isLoading, data } = useGetPosts({per_page: 5});
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2'>
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
  );
};

export default PostList;