import { Box, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, selectVegetableFilter, vegetableActions } from '../vegetableSlice';
import SliderCash from './SliderCash';

const FilterVegetables = () => {
    const categoryList = useSelector(selectCategories);
    const [selectedIndex, setSelectedIndex] = useState('');
    const filter = useSelector(selectVegetableFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(vegetableActions.fetchCategory());
        if (filter.length <= 2) {
            setSelectedIndex('');
        }
    }, [filter]);

    const handleListItemClick = (event, id) => {
        setSelectedIndex(id);
        const params = {
            ...filter,
            _page: 1,
            q: id,
        };
        dispatch(vegetableActions.setFilter(params));
    };

    return (
        <Box sx={{ mt: 5, minHeight: 750 }}>
            <Typography variant='h6' component='h2' gutterBottom>
                Theo loại
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

            <SliderCash />
        </Box>
    );
};
FilterVegetables.propTypes = {};

export default FilterVegetables;
