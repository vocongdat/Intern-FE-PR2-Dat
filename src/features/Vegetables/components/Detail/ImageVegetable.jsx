import { Box, CardMedia, Skeleton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    imgStyle: {
        width: 440,
        height: 440,
    },
    wrapCarousel: {
        maxWidth: 440,
        maxHeight: 440,
    },
    carousel: {},
});

const ImageVegetable = ({ imageList, loading }) => {
    const classes = useStyles();

    return (
        <>
            <Card sx={{ display: 'flex', mt: 8, mb: 4 }}>
                {loading ? (
                    <Skeleton variant='rectangular' width={440} height={440} />
                ) : (
                    <Carousel
                        showArrows='false'
                        autoPlay
                        infiniteLoop
                        emulateTouch
                        className={classes.wrapCarousel}
                    >
                        {imageList.map((imageUrl) => (
                            <div key={uuid()} className={classes.carousel}>
                                <img
                                    src={imageUrl}
                                    alt={imageUrl}
                                    loading='lazy'
                                    className={classes.imgStyle}
                                />
                            </div>
                        ))}
                    </Carousel>
                )}
            </Card>
        </>
    );
};
ImageVegetable.propTypes = {
    imageList: PropTypes.array,
    loading: PropTypes.bool,
};

ImageVegetable.defaultProps = {
    imageList: [],
    loading: true,
};

export default ImageVegetable;
