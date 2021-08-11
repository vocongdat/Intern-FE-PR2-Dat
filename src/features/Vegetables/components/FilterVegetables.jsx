import { Box, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { PRODUCT_PATH } from 'constants/index';
import {
    selectCategories,
    selectClear,
    selectVegetableFilter,
    vegetableActions,
} from '../vegetableSlice';
import SliderCash from './SliderCash';

const FilterVegetables = () => {
    const { t } = useTranslation();
    const { search } = useLocation();
    const history = useHistory();
    const categoryList = useSelector(selectCategories);
    const filter = useSelector(selectVegetableFilter);
    const [selectedIndex, setSelectedIndex] = useState(filter.q || '');
    const isClear = useSelector(selectClear);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(vegetableActions.fetchCategory());
        if (!isClear) {
            setSelectedIndex('');
        }
    }, [filter, isClear]);

    const handleListItemClick = (event, id) => {
        setSelectedIndex(id);
        const params = {
            ...filter,
            _page: 1,
            q: id,
        };
        if (search) {
            history.push(PRODUCT_PATH);
        }
        dispatch(vegetableActions.setFilter(params));
    };

    return (
        <Box sx={{ mt: 5, minHeight: 750 }}>
            <Typography variant='h6' component='h2' gutterBottom>
                {t('byCategory')}
            </Typography>

            <List component='nav' aria-label='main mailbox folders'>
                <ListItemButton
                    selected={selectedIndex === ''}
                    onClick={(event) => handleListItemClick(event, '')}
                >
                    <ListItemText>All</ListItemText>

                    <ListItemText sx={{ textAlign: 'end' }}>44</ListItemText>
                </ListItemButton>
                {categoryList.map((category) => (
                    <ListItemButton
                        key={category.id}
                        selected={selectedIndex === category.id}
                        onClick={(event) => handleListItemClick(event, category.id)}
                    >
                        <ListItemText>{category.name}</ListItemText>

                        <ListItemText sx={{ textAlign: 'end' }}>{category.quantity}</ListItemText>
                    </ListItemButton>
                ))}
            </List>

            {search ? '' : <SliderCash />}
        </Box>
    );
};
FilterVegetables.propTypes = {};

export default FilterVegetables;
