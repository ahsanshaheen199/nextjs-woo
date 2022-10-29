import ProductList from "../src/components/ProductList";
import CategoryWidget from "../src/components/shop/CategoryWidget";


const Shop = (  ) => {
    return (
        <>  
            <div className="py-20">
                <div className='grid grid-cols-4 gap-4'>
                    <div>
                        <CategoryWidget />
                    </div>
                    <div className="col-span-3 ml-4">
                        <ProductList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;