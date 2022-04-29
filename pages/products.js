import React from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Categories from "../components/Categories";
import LatestProducts from "../components/LatestProducts";

const Products = ( { latestProducts } ) => {
    return (
        <>
            <LatestProducts products={latestProducts} />
        </>
    );
};

export async function getStaticProps( context ) {

    const api = new WooCommerceRestApi({
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
        consumerKey: process.env.WC_CONSUMER_KEY,
        consumerSecret: process.env.WC_CONSUMER_SECRET,
        version: "wc/v3"
    });

    try {

        //latest products
        const latestProductsResponse = await api.get('products',{ per_page: 10 });
        const latestProducts = latestProductsResponse.data;

        return {
            props: {
                latestProducts: latestProducts
            }
        }
    } catch (error) {
        return {
            props: {
                latestProducts: []
            }
        }
    }
}

export default Products;