import Head from 'next/head'
import { getProducts, getProduct } from '../../lib/products'
import Layout from '../../components/layout'
import Product from '../../components/product'
import utilStyles from '../../styles/utils.module.scss'

export default function Post({ product }) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className={utilStyles.container}>
        <Product product={product}></Product>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const product = await getProduct(params.id)
  return {
    props: {
      product
    }
  }
}