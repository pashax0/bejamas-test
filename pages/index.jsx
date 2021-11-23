import { dummyProducts } from '../api/data/seed';

import PageHeader from '../components/__organisms__/PageHeader';
import Storefront from '../components/__organisms__/Storefront';
import FeaturedProduct from '../components/__organisms__/FeaturedProduct';
import Page from '../components/__atoms__/Page';

function Home({ featuredProduct }) {
  const head = () => (
    <>
      <title>Bejamas test app</title>
      <meta name="description" content="Bejamas test app" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </>
  );

  return (
    <Page head={head()}>
      <PageHeader />
      <main>
        <FeaturedProduct product={featuredProduct} />
        <Storefront />
      </main>
    </Page>
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
