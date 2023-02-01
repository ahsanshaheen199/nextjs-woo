import { getCategories } from '../api/category-api';
import Category from './Category';
import CategoryLoader from './CategoryLoader';

const CategoriList = () => {
  const { isLoading: isLoadingCategory, error, data: categories } = getCategories(4);
  return (
    <>
      <div className='container mx-auto px-4'>
        {isLoadingCategory ? (
          <div className="grid gap-4 lg:grid-cols-4">
            <CategoryLoader count={4} />
          </div>
        ) : (
          <div className="grid gap-4 pb-20 lg:grid-cols-4">
            {categories.map((category) => {
              return (
                <div key={category.id}>
                  <Category category={category} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriList;
