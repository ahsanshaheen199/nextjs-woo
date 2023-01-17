import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if( req.method === 'POST' ) {
    const api = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
      consumerKey: process.env.WC_CONSUMER_KEY,
      consumerSecret: process.env.WC_CONSUMER_SECRET,
      version: 'wc/v3'
    });

    try {
      const response = await api.post('orders', req.body);
      res.status(response.status).json({
        orderId: response.data.id,
        message: 'Order created successfully'
      });
    } catch( error ) {
      res.status(error.response.status).json({
        message: 'Could not create order'
      });
    }
  }
}