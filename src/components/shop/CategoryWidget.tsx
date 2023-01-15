import Link from 'next/link';
import { getCategoriesTree } from '../../api/category-api';

const CategoryWidget = () => {
  const { isLoading, error, data: categories } = getCategoriesTree();

  return (
    <div className="rounded-md p-5 shadow-md">
      <h3 className="mb-3 text-lg font-semibold">Categories</h3>
      {isLoading && (
        <div className="animate-pulse space-y-2">
          <div className="h-4 w-full bg-gray-200"></div>
          <div className="h-4 w-full bg-gray-200"></div>
          <div className="h-4 w-full bg-gray-200"></div>
          <div className="h-4 w-full bg-gray-200"></div>
          <div className="h-4 w-full bg-gray-200"></div>
          <div className="h-4 w-full bg-gray-200"></div>
        </div>
      )}
      {categories && (
        <ul className="space-y-3">
          {categories.map((cat) => {
            return (
              <li key={cat.id}>
                <Link href={`/categories/${cat.id}`}>
                  <a className="text-sm hover:text-[#ee4e23]">{cat.name}</a>
                </Link>
                {
                  <ul className="ml-3 mt-3 space-y-3">
                    {cat.children?.map((c) => {
                      return (
                        <li key={c.id}>
                          <Link href={`/categories/${c.id}`}>
                            <a className="text-sm hover:text-[#ee4e23]">{c.name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                }
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryWidget;
