import { getCategories } from '../api/category-api';
import Category from './Category';
import CategoryLoader from './CategoryLoader';

const CategoriList = () => {
  const { isLoading: isLoadingCategory, error, data: categories } = getCategories(3);
  return (
    <>
      <div className={'flex flex-wrap -mx-4 pt-20'}>
        <div className={'w-full px-4 text-center'}>
          <h2 className={'text-3xl text-[#484c51] leading-[1.5] mb-10'}>Categories</h2>
        </div>
      </div>
      {
        isLoadingCategory  ? ( 
          <div className="grid lg:grid-cols-3 gap-4">
            <CategoryLoader count={3} />
          </div> 
        ) : (
          <div className='grid lg:grid-cols-3 gap-4 pb-20'>
            {
              categories.map( category => {
                return (
                  <div key={category.id}>
                    <Category category={category} />
                  </div>
                );
              } )
            }
          </div>
        )
      }
    </>
  );
};

export default CategoriList;