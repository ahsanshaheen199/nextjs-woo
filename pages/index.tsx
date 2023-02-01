import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import SectionTitle from '../src/components/SectionTitle';
import Products from '../src/components/ProductList';
import CategoryLoader from '../src/components/CategoryLoader';
import CategoriList from '../src/components/CategoryList';
import HeroSection from '../src/components/partials/home/HeroSection';
import Header from '../src/components/shared/Header';
import Footer from '../src/components/shared/Footer';
import Head from 'next/head';
import Subscribe from '../src/components/partials/home/Subscribe';
import Reviews from '../src/components/partials/home/Reviews';
import SocialNetwork from '../src/components/partials/home/SocialNetwork';
import TopRatedProducts from '../src/components/partials/home/TopRatedProducts';

export default function Home({ latestProducts, topRatedProducts, onSaleProducts }) {
  return (
    <>
      <Head>
        <title>Nextjs Woo | Home</title>
      </Head>
      <Header />

      <HeroSection />

      <section className='pt-20'>
        <SectionTitle title='Featured Categories' description='products at affordable price' margin='pb-20' />
        <CategoriList />
      </section>

      <section className='py-20'>
        <SectionTitle title='Top Rated Products' description='Check out top rated products' margin='pb-20' />
        <TopRatedProducts />
      </section>

      <section className='py-20'>
        <SocialNetwork />
      </section>

      <section className='py-20'>
        <SectionTitle title='Reviews' description='What customers say about our products' margin='pb-20' />
        <Reviews />
      </section>

      <Subscribe />
      <Footer />

      {/* <SectionTitle title={'Recent Products'} />
      <Products products={latestProducts} />

      <SectionTitle title={'Top Rated Products'} />
      <Products products={topRatedProducts} />
      <SectionTitle title={'On Sale Products'} />
      <Products products={onSaleProducts} /> */}
    </>
  );
}

// export async function getStaticProps( context ) {

//   const api = new WooCommerceRestApi({
//     url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
//     consumerKey: process.env.WC_CONSUMER_KEY,
//     consumerSecret: process.env.WC_CONSUMER_SECRET,
//     version: 'wc/v3'
//   });

//   try {

//     //latest products
//     const latestProductsResponse = await api.get('products',{ per_page: 6 });
//     const latestProducts = latestProductsResponse.data;

//     // top rated products
//     const topRatedProductsResponse = await api.get('products',{ per_page: 6, orderby: 'rating' });
//     const topRatedProducts = topRatedProductsResponse.data;

//     // On Sale products
//     const onSaleProductsResponse = await api.get('products',{ per_page: 6, on_sale: true });
//     const onSaleProducts = onSaleProductsResponse.data;

//     return {
//       props: {
//         latestProducts: latestProducts,
//         topRatedProducts: topRatedProducts,
//         onSaleProducts: onSaleProducts,
//         categories: categories
//       }
//     };
//   } catch (error) {
//     return {
//       props: {
//         latestProducts: [],
//         topRatedProducts: [],
//         categories: []
//       }
//     };
//   }
// }
