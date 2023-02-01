import React from 'react';

type Props = {}

const Subscribe = (props: Props) => {
  return (
    <div className='bg-[#e8ecef]'>
      <div className='container mx-auto px-4'>
        <div className='text-center pt-12 pb-[120px]'>
          <h2 className='text-8xl font-regular font-herr'>Subscribe</h2>
          <div className='max-w-xl mx-auto mt-10'>
            <form className='relative'>
              <input type="email" className='border-transparent h-[52px] w-full rounded-[27.5px] px-6 outline-none focus:border-[#5993c0] focus:ring-0' />
              <button type='submit' className='btn-primary absolute top-0 right-0 py-4'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;