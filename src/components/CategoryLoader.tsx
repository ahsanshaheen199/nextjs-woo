type CategoryLoaderProps = {
  count: number;
};

const CategoryLoader = (props: CategoryLoaderProps) => {
  const { count } = props;
  return (
    <>
      {Array.from({ length: count }, (v, i) => {
        return (
          <div key={i} className="mb-8 animate-pulse">
            <div className="mb-4 h-[200px] w-full bg-gray-200"></div>
            <div className="h-4 w-full bg-gray-200"></div>
          </div>
        );
      })}
    </>
  );
};

export default CategoryLoader;
