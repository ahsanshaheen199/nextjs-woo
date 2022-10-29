import { useRouter } from "next/router";
import { getProducts } from "../api/product-api";
import Product from "./shared/Product";
import ProductLoader from "./shared/ProductLoader";

const ProductList = () => {

    const { query } = useRouter();

    const {isLoading, error, data: products} = getProducts(query);

    if( error ) {
        return (
            <h2>{error.message}</h2>
        )
    }

    if( isLoading ) {
        return (
            <div className="grid grid-cols-3 gap-4">
                <ProductLoader count={6} />
            </div>
        );
    }


    return (
        <div className="grid grid-cols-3 gap-4">
            {
                products.map( product => {
                    return (
                        <Product key={product.id} product={product} />
                    )
                } )
            }
            
        </div>
    );
};

export default ProductList;