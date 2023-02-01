import { useRouter } from 'next/router';
import { useProductByCategory } from '../../src/api/product-api';
import { useCategoryById } from '../../src/api/category-api';
import Product from '../../src/components/Product';
import ProductLoader from '../../src/components/shared/ProductLoader';
import Pagination from '../../src/components/shop/Pagination';
import Layout from '../../src/components/Layout';

const ProductCategory = () => {
  const { query } = useRouter();
  
  const { isLoading: isProductLoading, data: products } = useProductByCategory(query.catId as string, {
    enabled: !! query.catId
  });
  const { isLoading: isCategoryLoading, data: category } = useCategoryById(query.catId as string, {
    enabled: !! query.catId
  });

  return (
    <Layout>
      <div className="py-20">
        <div className="container mx-auto px-4">
          {isCategoryLoading ? (
            <div className="animate-pulse">
              <div className="mx-auto h-10 max-w-md bg-gray-200"></div>
            </div>
          ) : (
            <div className="mb-15">
              <h2 className="text-center text-2xl font-bold">{category.name}</h2>
            </div>
          )}
          {isProductLoading ? (
            <div className="mt-20 grid gap-4 lg:grid-cols-4">
              <ProductLoader count={10} />
            </div>
          ) : (
            <>
              <div className="mt-20 grid gap-4 lg:grid-cols-4">
                {products.products.map((product) => {
                  return <Product key={product.id} product={product} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCategory;
