import Head from 'next/head';
import ProductList from '../src/components/ProductList';
import CategoryWidget from '../src/components/shop/CategoryWidget';


const Shop = () => {
  return (
    <>
      <Head>
        <title>Nextjs Woo | Shop</title>
      </Head>
      <div className="py-20">
        <div className='lg:gap-4 gap-6 grid lg:grid-cols-4'>
          <div>
            <CategoryWidget />
          </div>
          <div className="lg:col-span-3 lg:ml-4">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;