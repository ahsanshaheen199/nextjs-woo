import { getCategories } from '../api/category-api';
import Category from './Category';
import CategoryLoader from './CategoryLoader';

const CategoriList = () => {
  const { isLoading: isLoadingCategory, error, data: categories } = getCategories(3);
  return (
    <>
      <div className={'-mx-4 flex flex-wrap pt-20'}>
        <div className={'w-full px-4 text-center'}>
          <h2 className={'mb-10 text-3xl leading-[1.5] text-[#484c51]'}>Categories</h2>
        </div>
      </div>
      {isLoadingCategory ? (
        <div className="grid gap-4 lg:grid-cols-3">
          <CategoryLoader count={3} />
        </div>
      ) : (
        <div className="grid gap-4 pb-20 lg:grid-cols-3">
          {categories.map((category) => {
            return (
              <div key={category.id}>
                <Category category={category} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CategoriList;
