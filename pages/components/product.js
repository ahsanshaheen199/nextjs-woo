import React from 'react';

const Product = ({ product }) => {
    return (
        <>
            <a href="#" className="group">
                <div
                    className="w-full bg-gray-200 rounded-lg overflow-hidden">
                    {
                        product.images.length > 0 && (
                            <img src={product.images[0].src}
                                 alt={product.name}
                                 className="w-full h-full object-center object-cover group-hover:opacity-75" />
                        )
                    }

                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: product.price_html }}></p>
            </a>
            {
                (product.type === 'grouped' || product.type === 'variable' ) && <a className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>Read More</a>
            }
            {
                product.type === 'simple' && <a className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>Add to cart</a>
            }
            {
                product.type === 'external' && <a className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>{product?.button_text ?? 'Buy product'}</a>
            }
        </>
    );
};

export default Product;