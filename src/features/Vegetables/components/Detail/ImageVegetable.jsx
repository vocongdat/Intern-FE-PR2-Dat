import { Box, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import PropTypes from 'prop-types';

const ImageVegetable = ({ imageList }) => (
    <>
        <Card sx={{ display: 'flex', mt: 8, mb: 4 }}>
            <CardMedia
                sx={{ width: 440, height: 440 }}
                image={imageList[0]}
                title='Live from space album cover'
            />
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 8 }}>
            <ImageList sx={{ width: 440 }} cols={3} rowHeight={170}>
                {imageList.map((item) => (
                    <ImageListItem key={item}>
                        <img srcSet={item} alt={item} loading='lazy' />
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    </>
);

ImageVegetable.propTypes = {
    imageList: PropTypes.array,
};

ImageVegetable.defaultProps = {
    imageList: [],
};

export default ImageVegetable;
