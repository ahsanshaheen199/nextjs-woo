import { useContext, useState } from 'react';
import Link from 'next/link';
import { CartContext } from '../../../context/CartContext';
import { FaAlignJustify, FaFacebookF, FaInstagram, FaLinkedin, FaShoppingCart, FaTwitter, FaUserAlt } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Header = () => {
  const {state} = useContext(CartContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <header>
        {/* Logo Area */}
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-4 py-9 items-center'>
            <div>
              <ul className='flex justify-center md:justify-start space-x-4'>
                <li>
                  <a href='#'><FaTwitter /></a>
                </li>
                <li>
                  <a href='#'><FaFacebookF /></a>
                </li>
                <li>
                  <a href='#'><FaInstagram /></a>
                </li>
                <li>
                  <a href='#'><FaLinkedin /></a>
                </li>
              </ul>
            </div>
            <div className='hidden lg:block'>
              <h1 className='text-center text-3xl text-black font-bold'>Nextjs Woo</h1>
            </div>
            <div className='flex justify-center md:justify-end space-x-8'>
              <Link href="/">
                <a className='p-3 cursor-pointer inline-flex items-center bg-[#f4f7f8] rounded-full'>
                  <FaUserAlt />
                </a>
              </Link>
              <Link href="/cart">
                <a className='p-3 cursor-pointer inline-flex items-center bg-[#f4f7f8] rounded-full relative'>
                  <FaShoppingCart />
                  <span className='absolute top-1/2 -left-2 w-5 h-5 bg-[#ee4e23] text-white inline-flex justify-center items-center rounded-full'>0</span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu Area */}
        <div className='hidden lg:block bg-[#2f2f34] py-7'>
          <div className='container mx-auto px-4'>
            <nav>
              <ul className='flex justify-center space-x-10'>
                <li>
                  <Link href="/">
                    <a className='text-white text-sm font-medium'>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className='text-white text-sm font-medium'>Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className='text-white text-sm font-medium'>Shop</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className='text-white text-sm font-medium'>Account</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className='lg:hidden bg-[#2f2f34] py-7'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 items-center'>
              <div><h1 className='text-xl text-white font-bold'>Nextjs Woo</h1></div>
              <div onClick={() => setIsSidebarOpen(true)} className='inline-flex justify-end text-white cursor-pointer'>
                <FaAlignJustify />
              </div>
            </div>
          </div>
        </div>

        <MobileMenu />
    </header>
  );
};

export default Header;