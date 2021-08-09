import { Button, Container, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import Fingerprint from '@material-ui/icons/Fingerprint';
import {
    selectFavorite,
    selectVegetableLoading,
    vegetableActions,
} from 'features/Vegetables/vegetableSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { PRODUCT_PATH } from 'constants/index';
import { isAsyncThunkAction } from '@reduxjs/toolkit';
import favoriteApi from 'api/favoriteApi';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'row',
}));

const WishList = () => {
    const favoriteList = useSelector(selectFavorite);
    const loading = useSelector(selectVegetableLoading);
    const idCurrentUser = localStorage.getItem('access_token');

    const dispatch = useDispatch();

    const handleRemove = async (id) => {
        await favoriteApi.remove(id);
    };

    useEffect(() => {
        dispatch(vegetableActions.fetchFavoriteListByUser(idCurrentUser));
    }, [dispatch, handleRemove]);

    return (
        <Container maxWidth='lg' sx={{ my: 4 }}>
            <Stack spacing={4} justifyContent='space-evenly' alignItems='center'>
                {favoriteList.map((favoriteInfo) => (
                    <Item key={favoriteInfo.id}>
                        <IconButton
                            aria-label='delete'
                            color='secondary'
                            onClick={() => handleRemove(favoriteInfo.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Box
                            component='span'
                            sx={{
                                background: `url(${favoriteInfo.image}) no-repeat center center / cover`,
                                p: 8,
                                mx: 4,
                            }}
                        />
                        <Stack spacing={2} sx={{ color: 'common.black', fontWeight: 700 }}>
                            <Typography variant='subtitle1'>{favoriteInfo.name}</Typography>
                            <Typography>{favoriteInfo.price}.000đ </Typography>
                            <Typography>{favoriteInfo.createdAt}</Typography>
                        </Stack>
                        <Stack
                            spacing={3}
                            direction='row'
                            justifyContent='flex-end'
                            alignItems='center'
                            sx={{ mx: 6 }}
                        >
                            <Link
                                to={`${PRODUCT_PATH}/${favoriteInfo.slug}?id=${favoriteInfo.vegetableId}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button variant='outlined' color='primary'>
                                    Tùy chọn khác
                                </Button>
                            </Link>
                            <Button variant='contained' color='primary'>
                                Thêm vào giỏ hàng
                            </Button>
                        </Stack>
                    </Item>
                ))}
            </Stack>
        </Container>
    );
};

WishList.propTypes = {};

export default WishList;
