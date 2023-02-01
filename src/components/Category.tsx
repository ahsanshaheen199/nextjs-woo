import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../types/Category';
import { isEmpty } from 'lodash';

type CategoryProps = {
  category: Category;
};

const Category = (props: CategoryProps) => {
  const { category } = props;
  return (
    <Link href={`/categories/${category.id}`}>
      <a className={'group'}>
        <div className="w-full overflow-hidden rounded-lg">
          {category.image ? (
            <Image
              className="object-cover object-center group-hover:opacity-75"
              src={category.image.src}
              alt={category.name}
              width={400}
              height={400}
            />
          ) : (
            <Image
              src={`/placeholder.png`}
              alt={category.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
              width={400}
              height={400}
            />
          )}
        </div>
        <h3 className="mt-4 text-center text-lg font-medium text-black">{`${category.name}`}</h3>
        { ! isEmpty(category.description)  && <p className='text-sm font-light text-[#676767] text-center'>Оnly fresh ingredients</p> }
      </a>
    </Link>
  );
};

export default Category;
