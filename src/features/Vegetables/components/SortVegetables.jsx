import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import NorthIcon from '@material-ui/icons/North';
import SouthIcon from '@material-ui/icons/South';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
    selectClear,
    selectVegetableFilter,
    selectVegetableList,
    selectVegetablePagination,
    vegetableActions,
} from '../vegetableSlice';

const SortVegetables = () => {
    const [sortBy, setSortBy] = useState('normal');
    const [sort, setSort] = useState('desc');

    const vegetableList = useSelector(selectVegetableList);
    const pagination = useSelector(selectVegetablePagination);
    const filter = useSelector(selectVegetableFilter);
    const isClear = useSelector(selectClear);

    const dispatch = useDispatch();

    useEffect(() => {
        setSortBy('normal');
    }, [isClear]);

    const handleSelectionChange = (event) => {
        const valueSelection = event.target.value;
        setSortBy(valueSelection);

        const params = {
            ...filter,
            _page: 1,
            _sort: valueSelection,
            _order: sort,
        };

        dispatch(vegetableActions.setFilter(params));
    };

    const handleSort = (event, value) => {
        setSort(value);

        const params = {
            ...filter,
            _page: 1,
            _order: value,
        };

        dispatch(vegetableActions.setFilter(params));
    };

    const handleClearFilter = () => {
        const params = {
            _page: 1,
            _limit: 12,
        };

        dispatch(vegetableActions.setClearFilter(params));
        setSortBy('normal');
    };

    const sortList = [
        {
            id: uuid(),
            name: 'Mặc định',
            value: 'normal',
        },
        {
            id: uuid(),
            name: 'Giá',
            value: 'price',
        },
        {
            id: uuid(),
            name: 'Lượt xem',
            value: 'viewed',
        },
        {
            id: uuid(),
            name: 'Đánh giá',
            value: 'rating',
        },
        {
            id: uuid(),
            name: 'Thời gian',
            value: 'createdAt',
        },
        {
            id: uuid(),
            name: 'Mức độ phổ biến',
            value: 'sold',
        },
    ];

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size='small' sx={{ minWidth: 180 }}>
                <InputLabel id='sort-by-select-label'>Sắp xếp theo</InputLabel>

                <Select
                    labelId='sort-by-select-label'
                    id='simple-select'
                    value={sortBy}
                    label='Sắp xếp theo'
                    onChange={handleSelectionChange}
                >
                    {sortList.map((itemSort) => (
                        <MenuItem key={itemSort.id} value={itemSort.value}>
                            {itemSort.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <ToggleButtonGroup
                value={sort}
                exclusive
                onChange={handleSort}
                aria-label='sort'
                sx={{ mx: 2 }}
            >
                <ToggleButton value='asc' size='small' aria-label='increase'>
                    <NorthIcon />
                </ToggleButton>

                <ToggleButton value='desc' size='small' aria-label='decrease'>
                    <SouthIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <Typography
                variant='h6'
                component='span'
                sx={{ textAlign: 'end', display: 'inline-flex', mr: 2 }}
                gutterBottom
            >
                Hiển thi {vegetableList.length} kết quả trong {pagination._totalRow}
            </Typography>

            <Button
                variant='outlined'
                color='error'
                onClick={handleClearFilter}
                sx={{ textAlign: 'end' }}
            >
                Xóa bộ lọc
            </Button>
        </Box>
    );
};

SortVegetables.propTypes = {};

export default SortVegetables;
