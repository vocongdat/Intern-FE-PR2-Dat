import { Box, Button, Skeleton, Stack, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import cartApi from 'api/cartApit';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { formatNumber } from 'utils';
import { v4 as uuid } from 'uuid';
import Sharing from './Sharing';

const ContentVegetable = ({ id, name, price, weight, category, loading, images, slug }) => {
    const { t } = useTranslation();
    const [weightItem, setWeightItem] = useState(0);
    const [isEnable, setIsEnable] = useState(true);
    const idCurrentUser = localStorage.getItem('access_token');
    const [quantity, setQuantity] = useState(1);

    const handleWeightChange = (event) => {
        const valueWeight = event.target.value;
        setWeightItem(valueWeight);
        setIsEnable(false);
    };

    const handleOnChangeQuantity = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddToCart = async () => {
        const cartList = JSON.parse(localStorage.getItem('cartList')) || [];
        const valueForm = {
            userId: idCurrentUser,
            quantity: quantity * Number(weightItem),
            price,
            slug,
            image: images[0],
            name,
            vegetableId: id,
        };

        let newCartList = [];
        const result = cartList.find((vegetable) => vegetable.vegetableId === id);
        if (result) {
            const newResult = {
                ...result,
                quantity: quantity * Number(weightItem),
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

        const updateCartServer = {
            userId: idCurrentUser,
            list: newCartList,
        };

        await cartApi.add(updateCartServer);
    };

    return (
        <Box sx={{ mt: 7, ml: 2 }}>
            {loading ? (
                <Stack spacing={3}>
                    <Skeleton variant='h3' height={46} width={300} />
                    <Skeleton variant='h4' height={40} width={220} />
                </Stack>
            ) : (
                <>
                    <Typography variant='h3' component='h2' gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant='h4' component='p' color='primary.light' gutterBottom>
                        {formatNumber(price)}.000 đ
                    </Typography>
                </>
            )}

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    my: 4,
                }}
            >
                <Typography variant='subtitle' component='span' noWrap gutterBottom>
                    {t('weight')}
                </Typography>

                <FormControl sx={{ mx: 4, minWidth: 100 }}>
                    <Select
                        labelId='weight-select-label'
                        id='weight-select'
                        value={weightItem}
                        onChange={handleWeightChange}
                        size='small'
                    >
                        {weight.map((itemWeight, index) => (
                            <MenuItem key={uuid()} value={index + 1}>
                                {itemWeight}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TextField
                    id='outlined-number'
                    label={t('quantity')}
                    type='number'
                    value={quantity}
                    onChange={handleOnChangeQuantity}
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mr: 2, width: 100 }}
                />

                <Button
                    variant='contained'
                    color='primary'
                    disabled={isEnable || quantity <= 0}
                    onClick={handleAddToCart}
                >
                    {t('addToCard')}
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{ my: 2 }}
            >
                <Typography
                    variant='subtitle1'
                    component='p'
                    gutterBottom
                    sx={{ textTransform: 'uppercase', fontWeight: 500 }}
                >
                    SKU
                </Typography>
                <Typography variant='subtitle1' component='p' gutterBottom>
                    N/A
                </Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                <Typography
                    variant='subtitle1'
                    component='p'
                    gutterBottom
                    sx={{ textTransform: 'uppercase', fontWeight: 500 }}
                >
                    {t('category')}
                </Typography>
                <Typography variant='subtitle1' component='p' gutterBottom>
                    {category}
                </Typography>
            </Stack>

            <Sharing />
        </Box>
    );
};

ContentVegetable.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    weight: PropTypes.array,
    category: PropTypes.array,
    loading: PropTypes.bool,
    images: PropTypes.array,
    slug: PropTypes.string,
};

ContentVegetable.defaultProps = {
    id: '',
    name: '',
    price: 0,
    weight: [],
    category: [],
    loading: true,
    images: [],
    slug: '',
};

export default ContentVegetable;
