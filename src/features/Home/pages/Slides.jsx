import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { v4 as uuid } from 'uuid';
import Slider from '../components/Carousel/Carousel';
import HeroSection from '../components/Carousel/HeroSection';

const Slides = () => {
    const slideInfo = [
        {
            id: uuid(),
            name: 'Sống Organic - Sống khỏe',
            slogan: 'TRUST THE NATURE!',
            slug: '',
            imgProduct:
                'https://farmdalat.com/wp-content/uploads/2016/08/featured-product-box-01.png',
            backgroundUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide1-background.jpg',
            btnName: 'Xem ngay',
        },
        {
            id: uuid(),
            name: 'Cà phê',
            slogan: 'good for nature, good for you',
            brand: 'Organic',
            slug: '/ca-phe-farm-dalat?id=e3f86639-c310-4590-9532-248c223f48c2',
            imgProduct: 'https://farmdalat.com/wp-content/uploads/2020/06/IMG_3237_582x400-1.png',
            backgroundUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide2-background.jpg',
            btnName: 'Mua ngay',
        },
        {
            id: uuid(),
            name: 'Nước ép',
            slogan: 'tốt cho tự nhiên, tốt cho da của bạn',
            brand: 'Tự nhiên',
            slug: '/tra-cam-sa-organic-orange-lemongrass-tea?id=9db92857-23d6-48bc-94c9-43b687e7c84c',
            imgProduct:
                'https://farmdalat.com/wp-content/uploads/2016/08/featured-product-box-01.png',
            backgroundUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide3-background.jpg',
            btnName: 'Mua ngay',
        },
    ];
    return (
        <Carousel stopOnHover autoPlay emulateTouch infiniteLoop showThumbs={false}>
            <HeroSection />

            {slideInfo.map((slide) => (
                <div key={slide.id}>
                    <Slider
                        name={slide.name}
                        slogan={slide.slogan}
                        brand={slide.brand}
                        slug={slide.slug}
                        imgProduct={slide.imgProduct}
                        backgroundUrl={slide.backgroundUrl}
                        btnName={slide.btnName}
                    />
                </div>
            ))}
        </Carousel>
    );
};
export default Slides;
