import PropTypes from 'prop-types';
import { CardActionArea, CardActions, Modal, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import PopupQuickView from './PopupQuickView';

const cartStyle = {
    position: 'relative',
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

const cardActionStyle = {
    visibility: 'hidden',
    position: 'absolute',
    top: 194,
    left: 0,
    right: 0,
    bgcolor: 'primary.light',
    justifyContent: 'space-around',
};

const CardProduct = ({ vegetableInfo }) => {
    const { name, images, price, slug } = vegetableInfo;

    const [quickView, setQuickView] = useState(false);

    const handleQuickViewOpen = () => {
        setQuickView(true);
    };
    const handleQuickViewClose = () => {
        setQuickView(false);
    };
    const handleAddToCart = () => {
        console.log('Add to card success!');
    };

    return (
        <>
            <Card sx={cartStyle} onDoubleClick={handleAddToCart}>
                <CardActionArea>
                    <Paper
                        square
                        sx={{
                            height: 250,
                            width: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <CardMedia
                            sx={{ height: 250, transition: 'all .5s' }}
                            image={images[0]}
                            title={name}
                        />
                    </Paper>

                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant='h5' component='h4' gutterBottom>
                            {name}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='primary.light'
                            sx={{ fontWeight: 'fontWeightBold' }}
                        >
                            {price.join(' - ')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={cardActionStyle}>
                    <Tooltip
                        title='Lựa chọn các tùy chọn'
                        placement='top'
                        arrow
                    >
                        <IconButton
                            aria-label='Lựa chọn các tùy chọn'
                            sx={{ color: 'common.white' }}
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                    </Tooltip>

                    <Divider
                        orientation='vertical'
                        variant='middle'
                        color='#fafafa'
                        flexItem
                    />

                    <Tooltip
                        title='Thêm vào danh sách yêu thích'
                        placement='top'
                        arrow
                    >
                        <IconButton
                            aria-label='Thêm vào danh sách yêu thích'
                            sx={{ color: 'common.white' }}
                        >
                            <FavoriteBorderIcon />
                        </IconButton>
                    </Tooltip>

                    <Divider
                        orientation='vertical'
                        variant='middle'
                        color='#fafafa'
                        flexItem
                    />

                    <Tooltip title='Xem nhanh' placement='top' arrow>
                        <IconButton
                            aria-label='Xem nhanh'
                            sx={{ color: 'common.white' }}
                            onMouseDown={handleQuickViewOpen}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>

                    <Divider
                        orientation='vertical'
                        variant='middle'
                        color='#fafafa'
                        flexItem
                    />

                    <Tooltip title='So sánh' placement='top' arrow>
                        <IconButton
                            aria-label='So sánh'
                            sx={{ color: 'common.white' }}
                        >
                            <CompareArrowsIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            <Modal
                open={quickView}
                onMouseUp={handleQuickViewClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                sx={{
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.5s',
                    cursor: 'pointer',
                }}
            >
                <PopupQuickView vegetableInfo={vegetableInfo} />
            </Modal>
        </>
    );
};
CardProduct.propTypes = {
    vegetableInfo: PropTypes.object,
};

CardProduct.defaultProps = {
    vegetableInfo: {},
};

export default CardProduct;
