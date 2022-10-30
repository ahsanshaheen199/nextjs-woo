import Link from "next/link";
import { useEffect, useState } from "react";
import classNames from 'classnames';
import { useRouter } from "next/router";

type PaginationProps = {
    count: number;
}

const Pagination = ({count}: PaginationProps) => {
    const { query } = useRouter();

    useEffect( () => {
        if( query?.page ) {
            setCurrentPage(parseInt(query.page as string));
        }
    }, [query] );

    const [currentPage, setCurrentPage] = useState<number>(1);
    
  return (
    <>
        <ul className="flex justify-center mt-10">
        {
            Array.from({ length: count}, ( v, i ) => {
                return (
                    <li key={i}>
                        <Link href={`/shop?page=${i+1}`}>
                            <a
                                className={
                                    classNames(
                                        'py-2 px-3 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded',
                                        currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-500'
                                    )}
                                >
                                {i+1}
                            </a>
                        </Link>
                    </li>
                )
            } )
        }
        </ul>
    </>
  )
}

export default Pagination