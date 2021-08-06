import logoTransparent from 'assets/images/LogoGreen.png';
import logoGreen from 'assets/images/WebLogoGreen_Vietponics.png';
import logoWhite from 'assets/images/WebLogoWhite_Vietponics.png';
import greenBackground from 'assets/images/bg_02.jpg';
import featuredProduct from 'assets/images/featured_product.png';

import payment from 'assets/images/footer_payment.png';

import slideFirst from 'assets/images/slides/slide1-background.jpg';
import slideSecond from 'assets/images/slides/slide2-background.jpg';

import introduce from 'assets/images/introduce/about-pic-02.jpg';
import introduce1 from 'assets/images/introduce/about-carousel-01.jpg';
import introduce2 from 'assets/images/introduce/about-carousel-02.jpg';
import introduce3 from 'assets/images/introduce/about-carousel-03.jpg';
import introduce4 from 'assets/images/introduce/about-carousel-04.jpg';
import introduce5 from 'assets/images/introduce/about-carousel-05.jpg';
import introduce6 from 'assets/images/introduce/about-carousel-06.jpg';

import blog1 from 'assets/images/blogs/blog_1.jpg';
import blog2 from 'assets/images/blogs/blog_3.jpg';
import blog3 from 'assets/images/blogs/blog_2.jpg';

import company1 from 'assets/images/company/client-01.png';
import company2 from 'assets/images/company/client-02.png';
import company3 from 'assets/images/company/client-03.png';
import company4 from 'assets/images/company/client-04.png';
import company5 from 'assets/images/company/client-05.png';

const Images = {
    LOGO_TRANSPARENT: logoTransparent,
    LOGO_GREEN: logoGreen,
    LOGO_WHITE: logoWhite,
    PAYMENT: payment,
    SLIDE_1: slideFirst,
    SLIDE_2: slideSecond,
    INTRODUCE: introduce,
    GREEN_BG: greenBackground,
    FEATURED_BG: featuredProduct,
};

const IntroImage = [
    {
        title: 'Introduce Image 1',
        imageUrl: introduce1,
        id: 1,
    },
    {
        title: 'Introduce Image 2',
        imageUrl: introduce2,
        id: 2,
    },
    {
        title: 'Introduce Image 3',
        imageUrl: introduce3,
        id: 3,
    },
    {
        title: 'Introduce Image 4',
        imageUrl: introduce4,
        id: 4,
    },
    {
        title: 'Introduce Image 5',
        imageUrl: introduce5,
        id: 5,
    },
    {
        title: 'Introduce Image 6',
        imageUrl: introduce6,
        id: 6,
    },
];

const blogImages = {
    BLOG1: blog1,
    BLOG2: blog2,
    BLOG3: blog3,
};

const companyImages = [
    {
        title: 'POMADE',
        imageUrl: company1,
        id: 'pomade',
    },
    {
        title: 'SOUL BEAN Roastery',
        imageUrl: company2,
        id: 'soul-bean-roastery',
    },
    {
        title: 'GREEN WOOD',
        imageUrl: company3,
        id: 'green-wood',
    },
    {
        title: 'JUICY ONLINE MEDIA',
        imageUrl: company4,
        id: 'juicy-online-media',
    },
    {
        title: 'OrganicLand',
        imageUrl: company5,
        id: 'organic-land',
    },
];

export { Images, IntroImage, blogImages, companyImages };
