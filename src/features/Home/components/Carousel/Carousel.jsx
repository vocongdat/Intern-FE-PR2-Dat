import { CardMedia, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PRODUCT_PATH } from 'constants/path';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Slider = ({ name, slogan, brand, slug, imgProduct, backgroundUrl, btnName }) => {
    const [MousePosition, setMousePosition] = useState({
        left: 0,
        top: 0,
    });

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth).toFixed(2);
        const y = (e.clientY / window.innerHeight).toFixed(2);
        setMousePosition({ left: x, top: y });
    };
    return (
        <Paper
            sx={{
                position: 'relative',
                background: `rgba(0,0,0,0.2) url(${backgroundUrl}) no-repeat right top / cover`,
                width: '100%',
                height: 570,
            }}
            onMouseMove={(e) => handleMouseMove(e)}
        >
            <CardMedia
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'contain',
                    backgroundClip: 'border-box',
                    backgroundOrigin: 'border-box',
                    perspective: 10000,
                    transformStyle: 'flat',
                    transition: 'transform linear complex',
                    transform: `translate(calc(-80px *${MousePosition.left} ), calc(-80px * ${MousePosition.top}))`,
                }}
                image={imgProduct}
                title={name}
            />
            <Box
                sx={{
                    position: 'absolute',
                    transform: 'translate(-50%,-50%)',
                    top: '50%',
                    left: '35%',
                    textAlign: 'center',
                    color: 'hsl(0,0%,100%,1)',
                }}
            >
                <Typography
                    variant='h2'
                    component='h2'
                    gutterBottom
                    sx={{
                        perspective: 10000,
                        transformStyle: 'flat',
                        transition: 'transform linear complex',
                        transform: `translate(calc(-120px *${MousePosition.left} ), calc(-120px * ${MousePosition.top}))`,
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    variant='h4'
                    component='h2'
                    sx={{
                        fontSize: 74,
                        fontFamily: "'Great Vibes', cursive",
                        perspective: 10000,
                        transformStyle: 'flat',
                        transition: 'transform linear complex',
                        transform: `translate(calc(-120px *${MousePosition.left} ), calc(-120px * ${MousePosition.top}))`,
                    }}
                    gutterBottom
                >
                    {brand}
                </Typography>

                <Typography
                    variant='h4'
                    component='h3'
                    gutterBottom
                    color='common.black'
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'fontWeightMedium',
                        fontSize: '1.6rem',
                        perspective: 10000,
                        transformStyle: 'flat',
                        transition: 'transform linear complex',
                        transform: `translate(calc(-120px *${MousePosition.left} ), calc(-120px * ${MousePosition.top}))`,
                    }}
                >
                    {slogan}
                </Typography>

                <Link to={`${PRODUCT_PATH}${slug}`} style={{ textDecoration: 'none' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{
                            perspective: 10000,
                            transformStyle: 'flat',
                            transition: 'transform linear complex',
                            transform: `translate(calc(-120px *${MousePosition.left} ), calc(-120px * ${MousePosition.top}))`,
                        }}
                    >
                        {btnName}
                    </Button>
                </Link>
            </Box>
        </Paper>
    );
};

Slider.propTypes = {
    name: PropTypes.string,
    slogan: PropTypes.string,
    brand: PropTypes.string,
    slug: PropTypes.string,
    imgProduct: PropTypes.string,
    backgroundUrl: PropTypes.string,
    btnName: PropTypes.string,
};

Slider.defaultProps = {
    name: '',
    slogan: '',
    brand: '',
    slug: '/products',
    imgProduct: '',
    backgroundUrl:
        'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-02-slide1-background.jpg',
    btnName: 'Mua ngay',
};

export default React.memo(Slider);
