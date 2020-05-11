import Head from 'next/head'
import AppHeader from './appHeader'

import utilStyles from '../styles/utils.module.scss'

const name = 'I want pizza'
export const siteTitle = 'I want pizza'

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <title>I want pizza!</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900|Rammetto+One&display=swap" rel="stylesheet" />
        <meta
          name="I want pizza"
          content="Order your pizza from the best place in town!"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
        
      <AppHeader name={name} home={home}></AppHeader>
      <main>{children}</main>

      <footer>
        <p className={utilStyles.caption}>©2020 - I WANT PIZZA</p>
        <p className={utilStyles.caption}>123 Main St. - Magical mystery Place</p>
      </footer>

      <style jsx global>{`
        html,
        body {
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </div>
  )
}