import React from 'react';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Products from "../components/Products";

const LatestProducts = ( { latestProducts } ) => {
    return (
        <>  
            <div className='pt-20'>
                <Products products={latestProducts} />
            </div>
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

export default LatestProducts;