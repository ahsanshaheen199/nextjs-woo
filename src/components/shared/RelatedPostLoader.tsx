type Props = {
    count?: number;
  }
  
const RelatedPostLoader = ({ count = 4 }: Props) => {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        return (
          <div key={i} className="mb-8 animate-pulse">
            <div className="mb-10 h-[200px] w-full bg-gray-200"></div>
            <div className="mb-1 h-4 w-[200px] mx-auto bg-gray-200"></div>
            <div className="mb-1 h-4 w-[200px] mx-auto bg-gray-200"></div>
            <div className="h-3 w-20 mx-auto bg-gray-200"></div>
          </div>
        );
      })}
    </>
  );
};
    
export default RelatedPostLoader;