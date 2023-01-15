import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../types/Category';

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
              width={500}
              height={500}
            />
          ) : (
            <Image
              src={`/placeholder.png`}
              alt={category.name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
              width={500}
              height={500}
            />
          )}
        </div>
        <h3 className="mt-4 text-center text-sm text-gray-700">{`${category.name}  (${category.count})`}</h3>
      </a>
    </Link>
  );
};

export default Category;
