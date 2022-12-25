import '../styles/globals.css';
import Layout from '../src/components/Layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { queryClient } from '../src/lib/react-query';
import { Provider } from 'react-redux';
import { store } from '../src/store';

function MyApp({ Component, pageProps }: AppProps  ) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
