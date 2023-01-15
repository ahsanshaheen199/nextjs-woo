import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

export default function handler(req, res) {

  if( req.method === 'POST' ) {
    console.log(req.body);

    const api = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
      consumerKey: process.env.WC_CONSUMER_KEY,
      consumerSecret: process.env.WC_CONSUMER_SECRET,
      version: 'wc/v3'
    });
          
    res.status(200).json({ name: 'John Doe' });
  }
}