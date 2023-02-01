import Head from 'next/head';
import Layout from '../src/components/Layout';
import ProductList from '../src/components/ProductList';
import CategoryWidget from '../src/components/shop/CategoryWidget';

const Shop = () => {
  return (
    <>
      <Head>
        <title>Nextjs Woo | Shop</title>
      </Head>
      <Layout>
        <div className="py-20">
          <div className="grid gap-6 lg:grid-cols-4 lg:gap-4">
            <div>
              <CategoryWidget />
            </div>
            <div className="lg:col-span-3 lg:ml-4">
              <ProductList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
