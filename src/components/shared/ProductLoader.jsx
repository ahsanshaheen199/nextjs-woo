const ProductLoader = ({count = 6}) => {
  return (
    <>
        {
            Array.from( { length: count}, (v, i) => {
                return (
                    <div key={i} className='animate-pulse'>
                        <div className='bg-gray-200 w-full h-[200px] mb-4'></div>
                        <div className='bg-gray-200 w-full h-4 mb-1'></div>
                        <div className='bg-gray-200 w-full h-4 mb-3'></div>
                        <div className='bg-gray-200 w-20 h-4'></div>
                    </div>
                )
            } )
        }
    </>
  )
}

export default ProductLoader