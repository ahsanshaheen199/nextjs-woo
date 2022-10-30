import { useRouter } from 'next/router';
import { useProductByCategory } from '../../src/api/product-api';
import { useCategoryById } from '../../src/api/category-api';
import Product from '../../src/components/Product';
import ProductLoader from '../../src/components/shared/ProductLoader';

const ProductCategory = () => {
  const { query } = useRouter();
  const { isLoading: isProductLoading, data: products } = useProductByCategory(query.catId as string);
  const { isLoading: isCategoryLoading, data: category } = useCategoryById(query.catId as string);

  return (
    <div className='py-20'>
      <div className='container mx-auto px-4'>
        {
          isCategoryLoading  ? <div className='animate-pulse'><div className='max-w-md h-10 bg-gray-200 mx-auto'></div></div> : <div className='mb-15'><h2 className='text-center text-2xl font-bold'>{ category.name }</h2></div>
        }
        {
          isProductLoading ? 
            ( <div className="grid lg:grid-cols-4 gap-4 mt-20">
              <ProductLoader count={10} />
            </div> ) : (
              <div className="grid lg:grid-cols-4 gap-4 mt-20">
                {
                  products.map( product => {
                    return (
                      <Product key={product.id} product={product} />
                    );
                  } )
                }
              </div>
            ) 
        }
      </div>
    </div>
  );
};

export default ProductCategory;