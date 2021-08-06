import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { v4 as uuid } from 'uuid';
import HeroSection from '../components/Carousel/HeroSection';
import Slider from '../components/Carousel/Carousel';

const Slides = () => {
    const slideInfo = [
        {
            id: uuid(),
            name: 'Sống Organic - Sống khỏe',
            slogan: 'TRUST THE NATURE!',
            slug: '/products',
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
            slug: '/ca-phe-farm-dalat',
            imgProduct:
                'https://farmdalat.com/wp-content/uploads/2020/06/IMG_3237_582x400-1.png',
            backgroundUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide2-background.jpg',
            btnName: 'Mua ngay',
        },
        {
            id: uuid(),
            name: 'Nước ép',
            slogan: 'tốt cho tự nhiên, tốt cho da của bạn',
            brand: 'Tự nhiên',
            slug: '/tra-cam-sa-organic-orange-lemongrass-tea',
            imgProduct:
                'https://farmdalat.com/wp-content/uploads/2016/08/featured-product-box-01.png',
            backgroundUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide3-background.jpg',
            btnName: 'Mua ngay',
        },
    ];
    return (
        <Carousel
            stopOnHover
            autoPlay
            emulateTouch
            infiniteLoop
            showThumbs={false}
        >
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
