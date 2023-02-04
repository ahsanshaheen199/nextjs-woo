import { useContext, useState } from 'react';
import Link from 'next/link';
import {
  FaAlignJustify,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaShoppingCart,
  FaTwitter,
  FaUserAlt,
} from 'react-icons/fa';
import MobileMenu from './MobileMenu';
import { useAppSelector } from '../../hooks/store';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const cartItemCount = useAppSelector((state) => state.cart.lineItems.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header>
      {/* Logo Area */}
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-6 py-9 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          <div>
            <ul className="flex justify-center space-x-4 md:justify-start">
              <li>
                <a href="#">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <h1 className="text-center text-3xl font-bold text-black">Nextjs Woo</h1>
          </div>
          <div className="flex justify-center space-x-8 md:justify-end">
            <Link href="/">
              <a className="inline-flex cursor-pointer items-center rounded-full bg-[#f4f7f8] p-3">
                <FaUserAlt />
              </a>
            </Link>
            <Link href="/cart">
              <a className="relative inline-flex cursor-pointer items-center rounded-full bg-[#f4f7f8] p-3">
                <FaShoppingCart />
                <span className="absolute top-1/2 -left-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ee4e23] text-white">
                  {cartItemCount}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Area */}
      <div className="hidden bg-[#2f2f34] py-7 lg:block">
        <div className="container mx-auto px-4">
          <nav>
            <ul className="flex justify-center space-x-10">
              <li>
                <Link href="/">
                  <a className="text-sm font-medium text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <a className="text-sm font-medium text-white">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a className="text-sm font-medium text-white">Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="text-sm font-medium text-white">Account</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="bg-[#2f2f34] py-7 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 items-center">
            <div>
              <h1 className="text-xl font-bold text-white">Nextjs Woo</h1>
            </div>
            <div onClick={() => setIsSidebarOpen(true)} className="inline-flex cursor-pointer justify-end text-white">
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
