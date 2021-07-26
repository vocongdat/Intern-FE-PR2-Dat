import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const Slider = ({ subTitle, title, paragraph, imageUrl }) => (
    <Paper
        sx={{
            position: 'relative',
            background: `url(${imageUrl}) no-repeat center / cover`,
            width: '100%',
            height: 570,
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                left: '50%',
                textAlign: 'center',
                color: 'hsl(0,0%,100%,1)',
            }}
        >
            <Typography variant='h6' component='h2' gutterBottom>
                {subTitle}
            </Typography>
            <Typography
                variant='h2'
                component='h2'
                sx={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 74,
                    fontWeight: 700,
                    color: 'primary.main',
                }}
                gutterBottom
            >
                {title}
            </Typography>
            <Typography variant='subtitle1' component='p' gutterBottom>
                {paragraph}
            </Typography>
        </Box>
    </Paper>
);

Slider.propTypes = {
    subTitle: PropTypes.string,
    title: PropTypes.string,
    paragraph: PropTypes.string,
    imageUrl: PropTypes.string,
};

Slider.defaultProps = {
    subTitle: '',
    title: '',
    paragraph: '',
    imageUrl:
        'https://farmdalat.com/wp-content/uploads/2016/10/slider-home-03-slide3-background.jpg',
};

export default Slider;
