import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductImage } from '../../../types/Product';
import { useEffect, useRef, useState } from 'react';

const ImageGallery = ({images}: { images: ProductImage[] }) => {
  const [navOneSlider, setNavOneSlider] = useState(null);
  const [navTwoSlider, setNavTwoSlider] = useState(null);
  const sliderOne = useRef<Slider>(null);
  const sliderTwo = useRef<Slider>(null);
  const sliderOnesettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  const sliderTwosettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000
  };

  useEffect( () => {
    setNavOneSlider(sliderOne.current);
    setNavTwoSlider(sliderTwo.current);
  }, [] );

  return (
    <>
      {
        images.length > 1 ? (
          <>
            <Slider asNavFor={navTwoSlider} ref={sliderOne} {...sliderOnesettings}>
              {
                images.map( img => {
                  return (
                    <div key={img.id}>
                      <Image src={img.src} width={600} height={600} alt={'Gallery Image'} />
                    </div>
                  );
                } )
              }
            </Slider>
            <Slider className={'gallery-image-nav'} asNavFor={navOneSlider} ref={sliderTwo} {...sliderTwosettings}>
              {
                images.map( img => {
                  return (
                    <div className='px-0.5 cursor-pointer' key={img.id}>
                      <Image src={img.src} width={150} height={150}  alt={'Gallery Image'} />
                    </div>
                  );
                } )
              }
            </Slider>
          </>
        ) : (
          <div>
            <Image
              src={images[0].src}
              alt={images[0].name}
              className="w-full h-[555px]"
              width={600}
              height={600}
            />
          </div>
        )
      }
    </>
  );
};

export default ImageGallery;