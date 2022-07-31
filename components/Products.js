import React from 'react';
import Product from "./Product";

const Products = ({products}) => {
    return (
        <div className={'flex flex-wrap -mx-4 pb-10'}>
            {
                products.length > 0 ?

                    products.map( product => {
                        return (
                            <div key={product.id} className={'w-4/12 px-4 mb-10'}>
                                <Product product={product} />
                            </div>
                        )
                    } )

                    : <div className={'w-full text-center px-4'}><h2>No Product Found</h2></div>
            }
        </div>
    );
};

export default Products;