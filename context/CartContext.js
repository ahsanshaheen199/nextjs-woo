import React, {useEffect, useReducer} from 'react';
import {cartReducer, initialState} from "../reducer/cartReducer";
import axios from "axios";

export const CartContext = React.createContext();

export const CartContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartReducer, initialState);

    useEffect( () => {
        if( state.nonce ) {
            return;
        }

        const fetchNonce = async () => {
            const response = await axios.get('http://next-woo.test/wp-json/wc/store/v1/cart/');
            if( response.status === 200 ) {
                dispatch({ type: 'ADD_NONCE', payload: response.headers.nonce })
            }
        }

        fetchNonce();
    }, [state] )

    return (
        <CartContext.Provider value={ { state, dispatch } }>
            {children}
        </CartContext.Provider>
    );
};