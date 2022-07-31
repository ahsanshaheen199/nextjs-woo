import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Categories from "../components/Categories";
import SectionTitle from "../components/SectionTitle";
import Products from "../components/Products";

export default function Home( { latestProducts, categories, topRatedProducts, onSaleProducts } ) {
  return (
      <>
        <Categories categories={categories} />
        <SectionTitle title={'Recent Products'} />
        <Products products={latestProducts} />
        <SectionTitle title={'Top Rated Products'} />
        <Products products={topRatedProducts} />
        <SectionTitle title={'On Sale Products'} />
        <Products products={onSaleProducts} />
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

    // top rated products
    const topRatedProductsResponse = await api.get('products',{ per_page: 6, orderby: 'rating' });
    const topRatedProducts = topRatedProductsResponse.data;

    // On Sale products
    const onSaleProductsResponse = await api.get('products',{ per_page: 6, on_sale: true });
    const onSaleProducts = onSaleProductsResponse.data;

    return {
      props: {
        latestProducts: latestProducts,
        topRatedProducts: topRatedProducts,
        onSaleProducts: onSaleProducts,
        categories: categories
      }
    }
  } catch (error) {
    return {
      props: {
        latestProducts: [],
        topRatedProducts: [],
        categories: []
      }
    }
  }
}