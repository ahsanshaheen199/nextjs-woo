import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#f4f7f8]">
        <div className="py-16">
          <div className="container mx-auto px-4 xl:px-0">
            <div className="grid grid-cols-12 gap-4">
              {/* Column 1 */}
              <div className="col-start-1 col-end-6 lg:col-start-1 lg:col-end-4">
                <h2 className="mb-8 text-2xl text-black">Nextjs WooCommerce</h2>
                <div className="space-y-2">
                  <p className="text-sm text-[#676767]">1234 Heaven Stress, Beverly Hill.</p>
                  <p className="text-sm text-[#676767]">info@youdomain.com</p>
                  <p className="text-sm text-[#676767]">8:00 - 19:00, Monday - Saturday</p>
                </div>
                <div className="mt-7">
                  <Image src="/credit-card.png" width={130} height={22} alt="credit card" />
                </div>
              </div>
              {/* Column 2 */}
              <div className="col-start-7 col-end-12 lg:col-start-4 lg:col-end-6">
                <h3 className="mb-5 text-lg uppercase text-black">Information</h3>
                <ul className="space-y-4">
                  <li className="text-[#676767]">About Us</li>
                  <li className="text-[#676767]">Deliver Information</li>
                  <li className="text-[#676767]">Privacy Policy</li>
                  <li className="text-[#676767]">Terms & Conditions</li>
                </ul>
              </div>
              {/* Column 3 */}
              <div className="col-start-1 col-end-6 lg:col-start-7 lg:col-end-9">
                <h3 className="mb-5 text-lg uppercase text-black">Customer Service</h3>
                <ul className="space-y-4">
                  <li className="text-[#676767]">Contact Us</li>
                  <li className="text-[#676767]">Returns</li>
                  <li className="text-[#676767]">Site Maps</li>
                  <li className="text-[#676767]">Brands</li>
                  <li className="text-[#676767]">Gift Vouchers</li>
                  <li className="text-[#676767]">Affiliates</li>
                </ul>
              </div>
              {/* Column 4 */}
              <div className="col-start-7 col-end-12 lg:col-start-10 lg:col-end-12">
                <h3 className="mb-5 text-lg uppercase text-black">Extras</h3>
                <ul className="space-y-4">
                  <li className="text-[#676767]">Brands</li>
                  <li className="text-[#676767]">Newsletter</li>
                  <li className="text-[#676767]">Wish List</li>
                  <li className="text-[#676767]">Specials</li>
                  <li className="text-[#676767]">Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-10 text-center">
          <p className="text-sm text-[#676767]">&copy; {new Date().getFullYear()} Nextjs WooCommerce</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
