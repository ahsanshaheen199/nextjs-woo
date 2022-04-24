import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import LatestProducts from "./components/LatestProducts";

export default function Home( { latestProducts } ) {
  return (
      <LatestProducts products={latestProducts} />
  )
}


export async function getStaticProps( context ) {

  const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
  });

  try {
    const response = await api.get('products',{ per_page: 6 });
    const latestProducts = response.data;

    return {
      props: {
        latestProducts: latestProducts
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        latestProducts: []
      }
    }
  }
}