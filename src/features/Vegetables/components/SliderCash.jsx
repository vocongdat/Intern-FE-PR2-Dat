import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectClear, selectVegetableFilter, vegetableActions } from '../vegetableSlice';

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: 'primary.light',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 8,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

const minDistance = 50;

const SliderCash = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState([0, 500]);
    const filter = useSelector(selectVegetableFilter);
    const isClear = useSelector(selectClear);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isClear) setValue([0, 500]);
    }, [isClear]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };

    const handleFilterByRangePrice = () => {
        const params = {
            ...filter,
            price_gte: value[0],
            price_lte: value[1],
        };

        dispatch(vegetableActions.setFilter(params));
    };

    return (
        <Box sx={{ width: 250 }}>
            <Typography variant='h6' component='h2' gutterBottom>
                {t('byPrice')}
            </Typography>

            <AirbnbSlider
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                defaultValue={[0, 500]}
                value={value}
                onChange={handleChange}
                valueLabelDisplay='auto'
                min={0}
                step={5}
                max={500}
            />

            <Button
                variant='outlined'
                size='small'
                color='success'
                onClick={handleFilterByRangePrice}
            >
                {t('filter')}
            </Button>

            <Typography
                variant='body2'
                noWrap
                component='span'
                sx={{ ml: 1, fontSize: 13 }}
                gutterBottom
            >
                {t('price')} {value[0]}.000 đ — {value[1]}.000 đ
            </Typography>
        </Box>
    );
};

export default SliderCash;
