import { Container } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Paper from '@material-ui/core/Paper';
import { CompanyImages } from 'constants/index';
import React from 'react';

const Cooperation = () => (
    <Container>
        <Paper elevation={0} sx={{ mb: 5, bgcolor: 'grey.200' }}>
            <ImageList cols={5} rowHeight='auto'>
                {CompanyImages.map((image) => (
                    <ImageListItem
                        key={image.id}
                        sx={{
                            maxWidth: 120,
                            height: 82,
                            '& .MuiImageListItem-img': {
                                objectFit: 'contain',
                                m: 4,
                                filter: 'grayscale(1)',
                                cursor: 'grab',
                            },
                            '& :hover': {
                                filter: 'grayscale(0)',
                                transform: 'rotate(0.1deg)',
                                transition:
                                    'transform 0.25s cubic-bezier(0.5,400,0.5,-400)',
                            },
                        }}
                    >
                        <img
                            srcSet={image.imageUrl}
                            alt={image.title}
                            loading='lazy'
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Paper>
    </Container>
);

export default Cooperation;
