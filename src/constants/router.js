import Home from 'features/Home';
import React from 'react';

import { HOME_PATH, PRODUCT_PATH, BLOGS_PATH, CONTACT_PATH } from './path';

const Products = React.lazy(() => import('features/Products/Products'));
const BLogs = React.lazy(() => import('features/Blogs/Blogs'));
const Contact = React.lazy(() => import('features/Contact/Contact'));

const ROUTER = [
    {
        path: HOME_PATH,
        component: <Home />,
        title: 'Trang chủ',
        isExact: true,
    },
    {
        path: PRODUCT_PATH,
        component: <Products />,
        title: 'Sản phẩm',
        isExact: false,
    },
    {
        path: BLOGS_PATH,
        component: <BLogs />,
        title: 'Chia sẻ',
        isExact: false,
    },
    {
        path: CONTACT_PATH,
        component: <Contact />,
        title: 'Liên hệ',
        isExact: false,
    },
];

export default ROUTER;
