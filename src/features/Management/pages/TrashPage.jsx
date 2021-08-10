import { Box, LinearProgress, Pagination, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import vegetableApi from 'api/vegetableApi';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductFilters from '../components/ProductFilters';
import ProductTable from '../components/ProductTable';
import {
    managementActions,
    selectManagementLoading,
    selectProductTrashList,
    selectProductTrashListFilter,
    selectProductTrashListPagination,
} from '../ManagementSlice';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'spacing(4)',
    },

    loading: {
        position: 'absolute',
        top: 'spacing(-1)',
        width: '100%',
    },
});

const TrashPage = () => {
    const classes = useStyles();

    const loading = useSelector(selectManagementLoading);
    const productList = useSelector(selectProductTrashList);
    const filterTrash = useSelector(selectProductTrashListFilter);
    const pagination = useSelector(selectProductTrashListPagination);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(managementActions.fetchListTrashProduct(filterTrash));
    }, [dispatch, filterTrash]);

    const handlePageChange = (e, page) => {
        dispatch(
            managementActions.setFilterTrash({
                ...filterTrash,
                _page: page,
            })
        );
    };

    const handleSearchChange = (newFilter) => {
        dispatch(managementActions.setFilterWithDebounce(newFilter));
    };

    const handleFilterChange = (newFilter) => {
        dispatch(managementActions.setFilterTrash(newFilter));
    };

    const handleRemoveVegetable = async (product) => {
        try {
            await vegetableApi.remove(product?.id || '');

            toast.success('Remove vegetable successfully!');

            const newFilter = { ...filterTrash };
            dispatch(managementActions.setFilterTrash(newFilter));
        } catch (error) {
            alert('Failed to fetch vegetable', error);
        }
    };

    const handleRecycleVegetable = async (product) => {
        try {
            const data = { ...product, deletedAt: false };
            await vegetableApi.update(data);

            toast.success('Recycle Vegetable successfully!');

            const newFilter = { ...filterTrash };
            dispatch(managementActions.setFilterTrash(newFilter));
        } catch (error) {
            alert('Failed to fetch vegetable', error);
        }
    };

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant='h4'>Trash</Typography>
            </Box>

            <Box sx={{ my: 3 }}>
                <ProductFilters
                    filter={filterTrash}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            <ProductTable
                productList={productList}
                onEdit={handleRecycleVegetable}
                onRemove={handleRemoveVegetable}
                actionName='Khôi phục'
                titleUpdate='Thời gian xóa'
            />

            <Box my={2} display='flex' justifyContent='center'>
                <Pagination
                    color='primary'
                    count={Math.ceil(pagination._totalRow / pagination._limit)}
                    page={pagination?._page}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    );
};

export default TrashPage;
