import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import LatestProducts from "../components/LatestProducts";
import Categories from "../components/Categories";

export default function Home( { latestProducts, categories } ) {
  return (
      <>
        <Categories categories={categories} />
        <LatestProducts products={latestProducts} />
      </>
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
    // categories
    const categoriesResponse = await api.get('products/categories',{ per_page: 3 });
    const categories = categoriesResponse.data;

    //latest products
    const latestProductsResponse = await api.get('products',{ per_page: 6 });
    const latestProducts = latestProductsResponse.data;

    return {
      props: {
        latestProducts: latestProducts,
        categories: categories
      }
    }
  } catch (error) {
    return {
      props: {
        latestProducts: [],
        categories: []
      }
    }
  }
}