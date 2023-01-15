import { useRouter } from 'next/router';
import { getProducts } from '../api/product-api';
import Product from './Product';
import Pagination from './shop/Pagination';
import ProductLoader from './shared/ProductLoader';

const ProductList = () => {
  const { query } = useRouter();

  const { isLoading, error, data } = getProducts(query);

  if (error) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        <ProductLoader count={6} />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {data.products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
      {data.products.length > 0 && <Pagination count={parseInt(data.headers['x-wp-totalpages'])} />}
    </>
  );
};

export default ProductList;
