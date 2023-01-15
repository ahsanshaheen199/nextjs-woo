import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

type PaginationProps = {
  count: number;
};

const Pagination = ({ count }: PaginationProps) => {
  const { query } = useRouter();

  useEffect(() => {
    if (query?.page) {
      setCurrentPage(parseInt(query.page as string));
    }
  }, [query]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <ul className="mt-10 flex justify-center">
        {Array.from({ length: count }, (v, i) => {
          return (
            <li key={i}>
              <Link href={`/shop?page=${i + 1}`}>
                <a
                  className={classNames(
                    'rounded border border-gray-300 py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700',
                    currentPage === i + 1 ? 'bg-[#ee4e23] text-white' : 'text-gray-500'
                  )}
                >
                  {i + 1}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pagination;
