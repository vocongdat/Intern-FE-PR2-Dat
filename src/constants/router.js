import Home from 'features/Home';
import React from 'react';
import { v4 as uuid } from 'uuid';

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
        id: uuid(),
    },
    {
        path: PRODUCT_PATH,
        component: <Products />,
        title: 'Sản phẩm',
        isExact: false,
        id: uuid(),
    },
    {
        path: BLOGS_PATH,
        component: <BLogs />,
        title: 'Chia sẻ',
        isExact: false,
        id: uuid(),
    },
    {
        path: CONTACT_PATH,
        component: <Contact />,
        title: 'Liên hệ',
        isExact: false,
        id: uuid(),
    },
];

export default ROUTER;
