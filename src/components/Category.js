import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const Category = ({category}) => {
    return (
        <Link href={`/categories/${category.id}`}>
            <a className={'group'}>
                <div
                    className="w-full rounded-lg overflow-hidden">
                    {
                        category.image ? (
                            <Image
                                className="object-center object-cover group-hover:opacity-75"
                                src={category.image.src}
                                alt={category.name}
                                width={500}
                                height={500}
                            />
                        )
                        :
                        (
                            <Image
                                src={`/placeholder.png`}
                                alt={category.name}
                                className="w-full h-full object-center object-cover group-hover:opacity-75"
                                width={500}
                                height={500}
                            />
                        )
                    }
                </div>
                <h3 className="mt-4 text-sm text-gray-700 text-center">{`${category.name}  (${category.count})`}</h3>
            </a>
        </Link>
    );
};

export default Category;