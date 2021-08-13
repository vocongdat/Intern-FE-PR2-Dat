import { Button, Container, Snackbar, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Stack from '@material-ui/core/Stack';
import { styled } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { PRODUCT_PATH } from 'constants/index';
import { selectVegetableLoading, vegetableActions } from 'features/Vegetables/vegetableSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'row',
}));

const WishList = () => {
    // const loading = useSelector(selectVegetableLoading);
    // const idCurrentUser = localStorage.getItem('access_token');
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState([]);
    const idCurrentUser = localStorage.getItem('access_token');
    const [isAlert, setIsAlert] = useState(false);

    const handleRemove = (id) => {
        const newFavoriteList = favorite.filter((product) => product.vegetableId !== id);
        setFavorite(newFavoriteList);
        localStorage.setItem('favoriteLength', newFavoriteList.length);
        // await favoriteApi.remove(id);
    };

    const handleCloseAlert = () => {
        setIsAlert(false);
    };

    const handleAddToCart = (id) => {
        const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        if (!idCurrentUser) setIsAlert(true);
        else {
            const infoVegetable = favorite.find((vegetable) => vegetable.vegetableId === id);
            const { name, image, slug, price } = infoVegetable;
            const valueForm = {
                userId: idCurrentUser,
                quantity: 1,
                price,
                slug,
                image,
                name,
                vegetableId: id,
            };
            let newCartList = [];
            const result = cartList.find((vegetable) => vegetable.vegetableId === id);
            if (result) {
                const newResult = {
                    ...result,
                    quantity: Number(result.quantity) + 1,
                };
                const cartRemaining = cartList.filter((info) => info.vegetableId !== id);
                newCartList = [newResult, ...cartRemaining];
            } else {
                newCartList = [valueForm, ...cartList];
            }
            localStorage.setItem('cartList', JSON.stringify(newCartList));
            if (newCartList.length > 0) {
                const total = newCartList.reduce((acc, cur) => acc + Number(cur.quantity), 0);
                localStorage.setItem('countCart', total);
            }
            toast.success(`Thêm thành công "${name}" vào giỏ hàng`);
        }
    };

    useEffect(() => {
        setFavorite(JSON.parse(localStorage.getItem('favorite')) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorite));
        // dispatch(vegetableActions.fetchFavoriteListByUser(idCurrentUser));
    }, [dispatch, favorite]);

    return (
        <Container maxWidth='lg' sx={{ my: 4 }}>
            <Stack
                spacing={4}
                justifyContent='space-evenly'
                alignItems='center'
                sx={{ minHeight: 400 }}
            >
                {favorite.length <= 0 ? (
                    <Typography variant='h3' component='h6'>
                        Danh sách sản phẩm yêu thích trống
                    </Typography>
                ) : (
                    favorite.map((favoriteInfo) => (
                        <Item key={uuid()}>
                            <Stack direction='row' spacing={1}>
                                <IconButton
                                    aria-label='delete favorite-vegetable'
                                    color='secondary'
                                    component='p'
                                    onClick={() => handleRemove(favoriteInfo.vegetableId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
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
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleAddToCart(favoriteInfo.vegetableId)}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                            </Stack>
                        </Item>
                    ))
                )}
            </Stack>
            <Snackbar
                open={isAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleCloseAlert}
                message='Bạn phải đăng nhập mới sử dụng được tính năng này'
            />
        </Container>
    );
};

WishList.propTypes = {};

export default WishList;
