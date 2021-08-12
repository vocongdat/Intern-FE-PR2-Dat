import React from 'react';
import { v4 as uuid } from 'uuid';
import { BLOGS_PATH, CONTACT_PATH, HOME_PATH, PRODUCT_PATH } from './path';

const Home = React.lazy(() => import('features/Home/pages/HomePage'));
const Vegetables = React.lazy(() => import('features/Vegetables'));
const BLogs = React.lazy(() => import('features/Blogs/Blogs'));
const Contact = React.lazy(() => import('features/Contact/Contact'));

export const ROUTER = [
    {
        path: HOME_PATH,
        component: <Home />,
        title: 'home',
        isExact: true,
        id: uuid(),
    },
    {
        path: PRODUCT_PATH,
        component: <Vegetables />,
        title: 'product',
        isExact: false,
        id: uuid(),
    },
    {
        path: BLOGS_PATH,
        component: <BLogs />,
        title: 'blog',
        isExact: false,
        id: uuid(),
    },
    {
        path: CONTACT_PATH,
        component: <Contact />,
        title: 'contact',
        isExact: false,
        id: uuid(),
    },
];
