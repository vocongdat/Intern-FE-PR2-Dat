import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { v4 as uuid } from 'uuid';
import HeroSection from '../components/Carousel/HeroSection';
import Slider from '../components/Carousel/Carousel';

const Slides = () => {
    const slideInfo = [
        {
            id: uuid(),
            title: 'Quality products',
            subTitle: 'A FRIENDLY ORGANIC FARM',
            paragraph:
                'Our products are freshly harvested, washed ready for box and finally delivered from our family farm right to your doorstep.',
            imageUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-03-slide3-background.jpg',
        },
        {
            id: uuid(),
            title: 'Organik',
            subTitle: 'The friendly farm',
            paragraph:
                'We produce and serve organic fruits, vegetables, juices and dried products. Visit our site for a complete list of fresh and healthy produce.',
            imageUrl:
                'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-03-slide2-background.jpg',
        },
        {
            id: uuid(),
            title: 'Natural taste',
            subTitle: 'from the Farm',
            paragraph: 'REACH FOR A HEALTHIER YOU WITH ORGANIC FOODS',
            imageUrl:
                'https://farmdalat.com/wp-content/uploads/2016/08/slide03_01.jpg',
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
                        subTitle={slide.subTitle}
                        title={slide.title}
                        paragraph={slide.paragraph}
                        imageUrl={slide.imageUrl}
                    />
                </div>
            ))}
        </Carousel>
    );
};
export default Slides;
