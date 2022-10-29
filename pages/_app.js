import '../styles/globals.css'
import Layout from "../src/components/Layout";
import { CartContextProvider} from "../context/CartContext";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/lib/react-query';

function MyApp({ Component, pageProps }) {
  return (
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </CartContextProvider>)
}

export default MyApp
