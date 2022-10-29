import React, { useContext } from 'react';
import Link from "next/link";
import { CartContext } from '../../context/CartContext';

const Header = () => {
    const {state} = useContext(CartContext);
    return (
        <header className={'py-3 bg-[#2c2d33]'}>
            <div className={'container mx-auto px-4'}>
                <div className={'flex flex-wrap items-center -mx-4'}>
                    <div className={'w-2/12 px-4'}>
                        <Link href={'/'}>
                            <a className={'text-2xl text-white'}>Next Woo</a>
                        </Link>
                    </div>
                    <div className={'w-8/12 px-4'}>
                       <nav>
                           <ul className={'flex justify-center'}>
                               <li>
                                   <Link href={'/blog'}><a className={'text-white p-2'}>Blog</a></Link>
                               </li>
                               <li>
                                   <Link href={'/products'}><a className={'text-white p-2'}>Shop</a></Link>
                               </li>
                           </ul>
                       </nav>
                    </div>
                    <div className={'w-2/12 px-4 flex justify-end'}>
                        <Link href={'/cart'}>
                            <a className={'flex cursor-pointer items-center relative'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                <span className={'absolute top-1/2 left-3 w-5 h-5 bg-[#7ED321] text-white inline-flex justify-center items-center rounded-full'}>{state.items.length}</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;