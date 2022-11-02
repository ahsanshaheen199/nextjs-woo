import { FaStar } from 'react-icons/fa';

type RatingProps = {
    count: string;
}

const Rating = ({ count }: RatingProps) => {
    
  return (
    <>
      <div className="flex space-x-0.5">
        <>
          {
            Array.from( { length: Math.ceil(parseFloat(count)) }, ( v, i ) => {
              return (
                <div key={i+1} className="text-[#ee4e23]"><FaStar /></div>
              );
            }  )
          }
          {
            Array.from( { length: ( 5 - parseFloat(count) ) }, ( v, i ) => {
              return (
                <>
                  <div key={i+1} className="text-[#9dafb7]"><FaStar /></div>
                </>
              );
            }  )
          }
        </>
      </div>
    </>
  );
};

export default Rating;