import React from 'react';
import Product from "./Product";

const LatestProducts = ({products}) => {
    return (
        <>
            <div className={'flex flex-wrap -mx-4'}>
                <div className={'w-full px-4 text-center'}>
                    <h2 className={'text-3xl text-[#484c51] leading-[1.5] mb-10'}>Latest Products</h2>
                </div>
            </div>
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
        </>
    );
};

export default LatestProducts;