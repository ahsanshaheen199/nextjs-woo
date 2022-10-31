export type Product = {
    id: number;
    name: string;
    type: string;
    images: ProductImage[];
    price_html: string;
    add_to_cart: AddToCart;
    review_count: number;
    average_rating: string;
}

export type ProductImage = {
    id: number;
    alt: string;
    name: string;
    src: string;
}

export type AddToCart = {
    text: string;
}