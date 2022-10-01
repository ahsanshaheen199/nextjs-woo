import axios from 'axios';
import React from 'react'
import Product from '../../components/Product';

const ProductCategoty = ({products}) => {
  return (
    <div className={'flex flex-wrap -mx-4 py-20'}>
        {
            products.length > 0 ?

                products.map( product => {
                    return (
                        <div key={product.id} className={'w-4/12 px-4 mb-10'}>
                            <Product product={product} />
                        </div>
                    )
                } )

                : <div className={'w-full text-center px-4'}><h2>No Product Found</h2></div>
        }
    </div>
  )
}


export async function getServerSideProps(context) {

    const {catId} = context.query;

    try {

      const response =  await axios({
        method: 'GET',
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL + 'wp-json/wc/store/products/',
        params: {
          per_page: 10,
          category: catId
        }
      });

      return {
          props: {
            products: response.data
          }
      }

    } catch( error ) {
      return {
        props: {
          products: []
        }
      }
    }
}

export default ProductCategoty;