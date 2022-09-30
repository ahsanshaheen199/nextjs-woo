
export const initialState = {
    items: [],
    nonce: null,
    loading: false
}

export const cartReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'INCREMENT_CART':
            const found = state.items.find( item => item.id === action.product.id );

            let itemsArray = [];

            if( found ) {
                itemsArray = [
                    ...state.items.map( item => {
                        return item.id === action.product.id ? {
                            ...found,
                            quantity: action.quantity
                        } : item
                    } ),
                    
                ]
            } else {
                itemsArray = [
                    ...state.items,
                    {
                        id: action.product.id,
                        name: action.product.name,
                        images: action.product.images,
                        quantity: action.quantity
                    }
                ]
            }
            return {
                ...state,
                items: [...itemsArray]
            }
            
        case 'ADD_NONCE':
            return {
                ...state,
                nonce: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
           return state;
    }
}