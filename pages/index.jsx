// import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';

import PageHeader from '../components/PageHeader';
import Storefront from '../components/__organisms__/Storefront';
import FeaturedProduct from '../components/__organisms__/FeaturedProduct';
import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const dummyProducts = [
    {
        "name": "Hed Bench",
        "category": "people",
        "price": 3.89,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            alt: 'image',
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "name": "Zgg Balloon",
        "category": "food",
        "price": 93.89,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/415188/pexels-photo-415188.jpeg?cs=srgb&dl=pexels-pixabay-415188.jpg&fm=jpg'
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Fan",
        "category": "people",
        "price": 100,
        "currency": "USD",
        "image": {
            "src": "",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Architecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": "",
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Famurai King Restling",
        "category": "landmarks",
        "price": 10,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            alt: 'image',
        },
        "bestseller": false,
        "featured": true,
        "details": {
            "dimensions": {
                "width": 1020,
                "height": 1020
            },
            "size": 15000,
            "description": "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder \n" +
                "\n" +
                "text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.",
            "recommendations": [
                {
                    "src": "",
                    "alt": ""
                },
                {
                    "src": "",
                    "alt": ""
                },
                {
                    "src": "",
                    "alt": ""
                }
            ]
        }
    },
    {
        "name": "Red Bench",
        "category": "people",
        "price": 3,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            alt: 'image',
        },
        "bestseller": true,
        "featured": false,
        "details": null
    },
    {
        "name": "Egg Balloon",
        "category": "food",
        "price": 54,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/415188/pexels-photo-415188.jpeg?cs=srgb&dl=pexels-pixabay-415188.jpg&fm=jpg'
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Man",
        "category": "people",
        "price": 12,
        "currency": "USD",
        "image": {
            "src": "",
            "alt": ""
        },
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Brchitecture",
        "category": "landmarks",
        "price": 101,
        "currency": "USD",
        "dimmentions": {
            "width": 1020,
            "height": 1020
        },
        "image": "",
        "bestseller": false,
        "featured": false,
        "details": null
    },
    {
        "name": "Samurai King Restling",
        "category": "landmarks",
        "price": 11,
        "currency": "USD",
        "image": {
            src: 'https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            alt: 'image',
        },
        "bestseller": false,
        "featured": true,
        "details": {
            "dimensions": {
                "width": 1020,
                "height": 1020
            },
            "size": 15000,
            "description": "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder \n" +
                "\n" +
                "text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.",
            "recommendations": [
                {
                    "src": "",
                    "alt": ""
                },
                {
                    "src": "",
                    "alt": ""
                },
                {
                    "src": "",
                    "alt": ""
                }
            ]
        }
    }
];

const categories = [
    'people',
    'premium',
    'pets',
    'food',
    'landmarks',
    'cities',
    'nature'
];

const prices = [
    20,
    100,
    200
];

const fetcher = (page, sort = {}) => new Promise(function(resolve, reject) {
    const {by: sortBy = 'name', direction: sortDirection = 'asc'} = sort;

    const sortedProducts = dummyProducts.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        if (a[sortBy] < b[sortBy]) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        return 0;
    })

    const products = sortedProducts.slice((page * 6)  - 6, page * 6);

    setTimeout(() => {
        resolve({products, count: sortedProducts.length})
    }, 500);
});

const Home = ({featuredProduct}) => {
    const router = useRouter();

    const [products, updateProducts] = useState([]);
    const [sort, updateSorting] = useState({by: 'name', direction: 'asc'});

    useEffect(async () => {
        const data = await fetcher(1, sort);
        updateProducts(data.products);
    }, [sort]);

    const changeSortingDirection = () => {
        updateSorting(prevSorting => ({
            ...prevSorting,
            direction: prevSorting.direction === 'asc' ? 'desc' : 'asc',
        }));
        // TODO: handle router correctly for different parameters
        console.log(router);
        router.push('?sort=asc', undefined, { shallow: true });
    }

    const changeSortingType = (type) => {
        updateSorting(prevSorting => ({
            ...prevSorting,
            by: type,
        }));
        router.push(`?sortBy=${type}`, undefined, { shallow: true });
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <main>
        <FeaturedProduct {...featuredProduct} />
        <Storefront
            categories={categories}
            prices={prices}
            sort={sort}
            products={products}
            onToggleSorting={changeSortingDirection}
            onChangeSortingType={changeSortingType}
        />
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
    const featuredProduct = dummyProducts.find(product => product.featured);

    if (!featuredProduct) {
        return {
            notFound: true,
        }
    }

    return {
        props: { featuredProduct },
    }
}

export default Home;
