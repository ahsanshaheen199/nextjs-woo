import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <div className='w-full py-20 sm:pt-[120px] sm:pb-[180px] bg-[#1f1c23] relative'>
      <div className='text-center'>
        <h1 className='text-9xl text-white mb-6 font-herr'>Healthy Food</h1>
        <h3 className='font-thin text-white text-4xl mb-12'>the food that is cooked with love</h3>
        <Link href="/shop">
          <a className='btn-primary'>Shop Now</a>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;