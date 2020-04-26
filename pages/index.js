import Link from 'next/link'
import { getProducts, getProduct } from '../lib/products'
import Layout from '../components/layout'
import ProductCard from '../components/productCard'
import utilStyles from '../styles/utils.module.scss'
import cardStyles from '../styles/cards.module.scss'

export default function Home({ products }) {
  return (
    <Layout home>
      <div className="container">
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Check out our pizzas!</h2>
          <ul className={cardStyles.cardWrapper}>
            {products.map(product => (
              <ProductCard product={product} key={product.id}/>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products
    }
  }
}
