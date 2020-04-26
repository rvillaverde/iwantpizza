import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import fetch from 'node-fetch'

export default function Home({ products }) {
  return (
    <Layout home>
      <div className="container">
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Check out our pizzas!</h2>
          <ul className={utilStyles.cardWrapper}>
            {products.map(({ id, name, description, photo_url }) => (
              <li className={utilStyles.card} key={id}>
                <div className={utilStyles.cardMedia} style={{ backgroundImage: `url(${photo_url})` }}></div>
                <div className={utilStyles.cardPrimary}>
                  <Link href="/products/[id]" as={`/products/${id}`}>
                    <a>{ name }</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <p>{ description }</p>
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  //const products = JSON.parse(await getProducts())
  const res = await fetch('https://iwantpizzaapi.herokuapp.com/products')
  const products = await res.json()
  return {
    props: {
      products
    }
  }
}
