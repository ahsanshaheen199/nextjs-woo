import { useQuery } from "@tanstack/react-query";
import Product from "./Product";

const ProductList = () => {
    const fetcher = async () => {
        const response = await fetch('http://next-woo.test/wp-json/wc/store/products');
        const result = await response.json();
        return result;
    }
    const {isLoading, error, data} = useQuery(['latestProducts'],fetcher);

    if( isLoading ) {
        return ( 
            <h2>loading</h2>
        );
    }

    if( error ) {
        return (
            <h2>{error.message}</h2>
        )
    }
    return (
        <div className={'flex flex-wrap -mx-4 pb-10'}>
            {/* {
                products.length > 0 ?

                    products.map( product => {
                        return (
                            <div key={product.id} className={'w-4/12 px-4 mb-10'}>
                                <Product product={product} />
                            </div>
                        )
                    } )

                    : <div className={'w-full text-center px-4'}><h2>No Product Found</h2></div>
            } */}
            <h2>Product</h2>
        </div>
    );
};

export default ProductList;