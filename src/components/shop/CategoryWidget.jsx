import Link from 'next/link';
import { getCategories } from '../../api/category-api';

const CategoryWidget = () => {

  const { isLoading, error, data: categories } = getCategories();

  return (
    <div className='p-5 shadow-md rounded-md'>
      <h3 className="mb-3 text-lg font-semibold">Categories</h3>
      {
        isLoading && (
          <div className="animate-pulse space-y-2">
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="w-full h-4 bg-gray-200"></div>
          </div>
        )
      }
      {
        categories && (
          <ul className="space-y-3">
            {
              categories.map( cat => {
                return (
                  <li className="text-sm hover:text-indigo-600" key={cat.id}>
                    <Link href={`/categories/${cat.id}`}><a>{cat.name}</a></Link>
                  </li>
                );
              } )
            }
          </ul>
        )
      }

    </div>
  );
};

export default CategoryWidget;