import Link from 'next/link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type PaginationProps = {
  count: number;
};

const Pagination = ({ count }: PaginationProps) => {
  const { query, push, asPath } = useRouter();
  const [basePath,_] = asPath.split('?');
  
  useEffect(() => {
    if (query?.page) {
      setCurrentPage(parseInt(query.page as string));
    }
  }, [query]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <ul className="mt-10 flex justify-center">
        <li className={`h-11 w-11 inline-flex justify-center items-center ${currentPage === 1 && 'cursor-not-allowed'}`}>
          <button 
            onClick={ () => {push(`/${basePath.replace('/', '')}?page=${currentPage-1}`);} } 
            className='disabled:cursor-not-allowed disabled:opacity-50' disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
        </li>
        {Array.from({ length: count }, (_, i) => {
          return (
            <li 
              key={i}>
              <Link href={`/${basePath.replace('/', '')}?page=${i + 1}`}>
                <a className={classNames(
                  'rounded-full h-11 w-11 inline-flex justify-center items-center leading-tight hover:bg-gray-100 hover:text-gray-700 cursor-pointer',
                  currentPage === i + 1 ? 'bg-[#ee4e23] text-white' : 'text-gray-500'
                )}
                >
                  {i + 1}
                </a>
              </Link>
            </li>
          );
        })}
        <li className={`h-11 w-11 inline-flex justify-center items-center ${currentPage === count && 'cursor-not-allowed'}`}>
          <button onClick={ () => {push(`/${basePath.replace('/', '')}?page=${currentPage+1}`);} }  className='disabled:cursor-not-allowed disabled:opacity-50' disabled={currentPage === count}><FaChevronRight /></button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
