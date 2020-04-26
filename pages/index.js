import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import { getProducts } from '../lib/products'
import utilStyles from '../styles/utils.module.scss'


export default function Home({ products }) {
  return (
    <Layout home>
      <div className="container">
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Check out our pizzas!</h2>
          <ul className={utilStyles.cardWrapper}>
            {products.map(({ id, name, description, photo_url }) => (
              <li className={utilStyles.card} key={id}>
                <img src={photo_url}></img>
                <Link href="/products/[id]" as={`/products/${id}`}>
                  <a>{ name }</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <p>{ description }</p>
                </small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const products = JSON.parse(await getProducts())
  return {
    props: {
      products
    }
  }
}
