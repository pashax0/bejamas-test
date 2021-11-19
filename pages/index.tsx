import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';

import PageHeader from '../components/PageHeader';
import Storefront from '../components/__organisms__/Storefront';
import FeaturedProduct from '../components/__organisms__/FeaturedProduct';
import styles from '../styles/Home.module.css';

export const products = [
    {
        "name": "Red Bench",
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
        "name": "Egg Balloon",
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
        "name": "Man",
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
        "name": "Samurai King Restling",
        "category": "landmarks",
        "price": 101,
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
        "name": "Egg Balloon",
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
        "name": "Man",
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
        "name": "Samurai King Restling",
        "category": "landmarks",
        "price": 101,
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
]

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />
      <main>
        <FeaturedProduct {...products[4]} />
        <Storefront
            categories={categories}
            prices={prices}
        />
      </main>
    </div>
  )
}

export default Home;
