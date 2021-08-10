import { Box, Button, Typography } from '@material-ui/core';
import { Images } from 'constants/index';
import { PRODUCT_PATH } from 'constants/path';
import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const boxStyle = {
        background: `hsl(0, 0%, 90%) url(${Images.FEATURED_BG}) no-repeat center / cover`,
        height: 480,
        width: 350,
        textAlign: 'center',
    };

    return (
        <Box sx={boxStyle}>
            <Typography variant='h5' sx={{ pt: 6 }} gutterBottom>
                FRESH FRUITS
            </Typography>

            <Typography variant='h6' sx={{ py: 3 }} gutterBottom>
                More offers for May
            </Typography>

            <Link to={PRODUCT_PATH} style={{ textDecoration: 'none' }}>
                <Button variant='contained' color='primary' sx={{ m: 'auto' }}>
                    Mua ngay
                </Button>
            </Link>
        </Box>
    );
};

export default Banner;
