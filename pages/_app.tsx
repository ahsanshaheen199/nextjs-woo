import '../styles/globals.css';
import Layout from '../src/components/Layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { queryClient } from '../src/lib/react-query';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { useEffect } from 'react';
import api from '../src/lib/axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { addNonce } from '../src/store/global/global-slice';

function MyApp({ Component, pageProps }: AppProps  ) {

  const globalState = store.getState().global;
  
  useEffect(() => {
    if( ! globalState.nonce ) {
      api.get('v1/cart/items')
        .then( response => {
          const nonce = response.headers.nonce;
          store.dispatch(addNonce(nonce));
        });
    }
  }, [globalState]);
  

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
