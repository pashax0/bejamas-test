// import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';

import { dummyProducts } from '../data/seed';

import PageHeader from '../components/PageHeader';
import Storefront from '../components/__organisms__/Storefront';
import FeaturedProduct from '../components/__organisms__/FeaturedProduct';

import styles from '../styles/Home.module.css';

function Home({ featuredProduct }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <PageHeader />
      <main>
        <FeaturedProduct {...featuredProduct} />
        <Storefront />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const featuredProduct = dummyProducts.find((product) => product.featured);

  if (!featuredProduct) {
    return {
      notFound: true,
    };
  }

  return {
    props: { featuredProduct },
  };
}

export default Home;
