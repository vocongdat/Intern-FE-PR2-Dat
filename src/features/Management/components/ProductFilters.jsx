import { Box, Button, Grid, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managementActions, selectCategoryListList } from '../ManagementSlice';

const ProductFilters = ({ filter, onChange, onSearchChange }) => {
    const searchRef = useRef();
    const dispatch = useDispatch();

    const categoryList = useSelector(selectCategoryListList);

    useEffect(() => {
        dispatch(managementActions.fetchCategoryList());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        if (!onSearchChange) return;

        const newFilter = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    const handleCategoryChange = (e) => {
        if (!onChange) return;

        const newFilter = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        };
        onChange(newFilter);
    };

    const handleSortChange = (e) => {
        if (!onChange) return;

        const { value } = e.target;
        const [_sort, _order] = value.split('.');
        const newFilter = {
            ...filter,
            _sort: _sort || undefined,
            _order: _order || undefined,
        };
        onChange(newFilter);
    };

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            city: undefined,
            name_like: undefined,
        };
        onChange(newFilter);

        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant='outlined' size='small'>
                        <InputLabel htmlFor='searchByName'>Tìm theo tên sản phẩm</InputLabel>
                        <OutlinedInput
                            id='searchByName'
                            label='Tìm theo tên sản phẩm'
                            endAdornment={<Search />}
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant='outlined' size='small' fullWidth>
                        <InputLabel id='filterByCategory'>Lọc theo loại</InputLabel>
                        <Select
                            labelId='filterByCategory'
                            value={filter.city || ''}
                            onChange={handleCategoryChange}
                            label='Lọc theo loại'
                        >
                            <MenuItem value=''>
                                <em>All</em>
                            </MenuItem>

                            {categoryList.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <FormControl variant='outlined' size='small' fullWidth>
                        <InputLabel id='sortBy'>Sort</InputLabel>
                        <Select
                            labelId='sortBy'
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                            label='Sort'
                        >
                            <MenuItem value=''>
                                <em>No sort</em>
                            </MenuItem>

                            <MenuItem value='name.asc'>Name ASC</MenuItem>
                            <MenuItem value='name.desc'>Name DESC</MenuItem>
                            <MenuItem value='price.asc'>Price ASC</MenuItem>
                            <MenuItem value='price.desc'>Price DESC</MenuItem>
                            <MenuItem value='quantity.asc'>Quantity ASC</MenuItem>
                            <MenuItem value='quantity.desc'>Quantity DESC</MenuItem>
                            <MenuItem value='viewed.asc'>Viewed ASC</MenuItem>
                            <MenuItem value='viewed.desc'>Viewed DESC</MenuItem>
                            <MenuItem value='sold.asc'>Sold ASC</MenuItem>
                            <MenuItem value='sold.desc'>Sold DESC</MenuItem>
                            <MenuItem value='createdAt.asc'>CreatedAt ASC</MenuItem>
                            <MenuItem value='createdAt.desc'>CreatedAt DESC</MenuItem>
                            <MenuItem value='updatedAt.asc'>UpdatedAt ASC</MenuItem>
                            <MenuItem value='updatedAt.desc'>UpdatedAt DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <Button
                        variant='outlined'
                        color='primary'
                        fullWidth
                        onClick={handleClearFilter}
                    >
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

ProductFilters.propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func,
    onSearchChange: PropTypes.func,
};

ProductFilters.defaultProps = {
    filter: {},
    onChange: null,
    onSearchChange: null,
};

export default ProductFilters;
