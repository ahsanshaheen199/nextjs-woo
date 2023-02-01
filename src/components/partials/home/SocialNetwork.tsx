import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

type Props = {}

const SocialNetwork = (props: Props) => {
  return (
    <div className='container mx-auto px-4 bg-[#f4f7f8] py-8'>
      <div className='grid grid-cols-12'>
        <div className='sm:col-start-1 sm:col-end-7 lg:col-start-3 lg:col-end-8'>
          <p className='text-xs text-[#636363] font-light'>Subscribe to us on social networks and get the first news:</p>
        </div>
        <div className='lg:col-start-8 lg:col-end-10 sm:col-start-7 sm:col-end-12'>
          <ul className="flex space-x-8">
            <li>
              <a href="#">
                <FaTwitter className='text-[#636363]' />
              </a>
            </li>
            <li>
              <a href="#">
                <FaFacebookF className='text-[#636363]' />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagram className='text-[#636363]' />
              </a>
            </li>
            <li>
              <a href="#">
                <FaLinkedin className='text-[#636363]' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialNetwork;