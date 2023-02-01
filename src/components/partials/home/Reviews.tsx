import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

type Props = {}

const Reviews = (props: Props) => {
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6'>
      <div>
        <div className='py-12 px-10 shadow-review text-center'>
          <div className='mx-auto rounded-full h-[110px] w-[110px] bg-[#e8ecef] mb-5'></div>
          <div>
            <h3 className='text-black text-lg font-medium mb-1'>Xioami</h3>
            <p className='text-sm text-[#676767] mb-3'>From this pumpkin turned out a sweet pie. The family is happy. Courteous courier. Be sure to order more.</p>
            <FaQuoteLeft className='mx-auto text-[#9dafb8]' size={24} />
          </div>
        </div>
      </div>

      <div>
        <div className='py-12 px-10 shadow-review text-center'>
          <div className='mx-auto rounded-full h-[110px] w-[110px] bg-[#e8ecef] mb-5'></div>
          <div>
            <h3 className='text-black text-lg font-medium mb-1'>John Doe</h3>
            <p className='text-sm text-[#676767] mb-3'>Easty and fresh apples. I really liked. Also pleased delivery!</p>
            <FaQuoteLeft className='mx-auto text-[#9dafb8]' size={24} />
          </div>
        </div>
      </div>

      <div>
        <div className='py-12 px-10 shadow-review text-center'>
          <div className='mx-auto rounded-full h-[110px] w-[110px] bg-[#e8ecef] mb-5'></div>
          <div>
            <h3 className='text-black text-lg font-medium mb-1'>Pixelomatic</h3>
            <p className='text-sm text-[#676767] mb-3'>From this pumpkin turned out a sweet pie. The family is happy. Courteous courier. Be sure to order more</p>
            <FaQuoteLeft className='mx-auto text-[#9dafb8]' size={24} />
          </div>
        </div>
      </div>

      <div>
        <div className='py-12 px-10 shadow-review text-center'>
          <div className='mx-auto rounded-full h-[110px] w-[110px] bg-[#e8ecef] mb-5'></div>
          <div>
            <h3 className='text-black text-lg font-medium mb-1'>Palm</h3>
            <p className='text-sm text-[#676767] mb-3'>Fresh plums, all ok.</p>
            <FaQuoteLeft className='mx-auto text-[#9dafb8]' size={24} />
          </div>
        </div>
      </div>

      <div>
        <div className='py-12 px-10 shadow-review text-center'>
          <div className='mx-auto rounded-full h-[110px] w-[110px] bg-[#e8ecef] mb-5'></div>
          <div>
            <h3 className='text-black text-lg font-medium mb-1'>Palm</h3>
            <p className='text-sm text-[#676767] mb-3'>Еasty and fresh apples. I really liked. Also pleased delivery! Еasty and fresh apples. I really liked. Also pleased delivery! Еasty and fresh apples. I really liked. </p>
            <FaQuoteLeft className='mx-auto text-[#9dafb8]' size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;