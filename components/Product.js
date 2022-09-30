import React, { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import { CartContext } from '../context/CartContext';

const Product = ({ product }) => {

    const { state, dispatch } = useContext(CartContext);

    const [cartQty,setCartQty] = useState(0);

    useEffect(() => {
        const found = state.items.find( item => item.id === product.id );

        if( found ) {
            setCartQty(found.quantity);
        } else {
            setCartQty(0);
        }

    
    }, [state.items,product]);
    

    const addToCart = async ( event, prod ) => {
        event.preventDefault();

        dispatch({type: 'SET_LOADING', payload: true});

        dispatch({type: 'INCREMENT_CART', quantity: (cartQty + 1), product: prod});

        dispatch({type: 'SET_LOADING', payload: false})
    }

    return (
        <>
            <a href="#" className="group">
                <div
                    className="w-full rounded-lg overflow-hidden">
                    {
                        product.images.length > 0 ? (
                            <Image
                                src={product.images[0].src}
                                alt={product.name}
                                className="w-full h-full object-center object-cover group-hover:opacity-75"
                                width={400}
                                height={400}
                            />

                        )
                            :
                            <Image
                                src={`/placeholder.png`}
                                alt={product.name}
                                className="w-full h-full object-center object-cover group-hover:opacity-75"
                                width={400}
                                height={400}
                            />
                    }

                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900" dangerouslySetInnerHTML={{ __html: product.price_html }}></p>
            </a>
            {
                (product.type === 'grouped' || product.type === 'variable' ) && <a onClick={(event) => addToCart(event,product)} className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>Read More</a>
            }
            {
                product.type === 'simple' && ( 
                    <a disabled={state.loading} onClick={(event) => addToCart(event,product)} className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>
                        {
                            state.loading && (
                                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                            )
                        }
                        Add to cart
                    </a>
                )
            }
            {
                product.type === 'external' && <a onClick={(event) => addToCart(event,product)} className={'px-4 py-2 bg-[#E5E7EB] text-black inline-block mt-3 rounded cursor-pointer'}>{product?.button_text ?? 'Buy product'}</a>
            }
        </>
    );
};

export default Product;