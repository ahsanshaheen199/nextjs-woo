export type Product = {
  id: number;
  name: string;
  type: string;
  images: ProductImage[];
  price_html: string;
  add_to_cart: AddToCart;
  review_count: number;
  average_rating: string;
  short_description: string;
  categories: [
    {
      id: string;
      name: string;
      slug: string;
      link: string;
    }
  ];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
    currency_symbol: string;
  };
  regular_price: string;
  sale_price: string;
  related_ids: number[];
};

export type ProductImage = {
  id: number;
  alt: string;
  name: string;
  src: string;
};

export type AddToCart = {
  text: string;
};
