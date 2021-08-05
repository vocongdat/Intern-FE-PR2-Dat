import { Box, Chip, Stack } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { SnackbarsNotify } from 'components/Common/Client/index';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatNumber } from 'utils/common';
import { v4 as uuid } from 'uuid';

const cartStyle = {
    mb: 2,
    display: 'flex',
    cursor: 'pointer',
    '& .MuiCardMedia-root': {
        backgroundSize: 'cover',
        transition: 'all .5s',
    },
    '&:hover, &:focus': {
        '& .MuiCardActions-root': {
            visibility: 'visible',
        },
        '& .MuiCardMedia-root': {
            transition: 'all .5s',
            transform: 'scale(1.2)',
        },
        boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    },
};

const CardList = ({ vegetableInfo }) => {
    const { name, images, price, slug, categoryName } = vegetableInfo;

    const [open, setOpen] = useState(false);

    const formatPrice = formatNumber(price);

    const handleAddToCart = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={cartStyle} onDoubleClick={handleAddToCart}>
                <CardMedia sx={{ width: 151 }} image={images[0]} title={name} />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ textAlign: 'start', minWidth: 280 }}>
                        <Typography variant='h6' component='h4' gutterBottom>
                            {name}
                        </Typography>

                        <Typography
                            variant='body2'
                            color='primary.light'
                            sx={{ fontWeight: 'fontWeightBold' }}
                        >
                            {formatPrice}.000 đ
                        </Typography>

                        <Stack direction='row' spacing={1}>
                            {categoryName.map((category) => (
                                <Chip key={uuid()} label={category} color='primary' />
                            ))}
                        </Stack>
                    </CardContent>
                </Box>
            </Card>

            <SnackbarsNotify isOpen={open} handleClose={handleClose} />
        </>
    );
};

CardList.propTypes = {
    vegetableInfo: PropTypes.object,
};

CardList.defaultProps = {
    vegetableInfo: {},
};

export default CardList;
