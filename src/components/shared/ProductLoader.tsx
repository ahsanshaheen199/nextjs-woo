const ProductLoader = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        return (
          <div key={i} className="mb-8 animate-pulse">
            <div className="mb-4 h-[200px] w-full bg-gray-200"></div>
            <div className="mb-1 h-4 w-full bg-gray-200"></div>
            <div className="mb-3 h-4 w-full bg-gray-200"></div>
            <div className="h-4 w-20 mx-auto bg-gray-200"></div>
          </div>
        );
      })}
    </>
  );
};

export default ProductLoader;
