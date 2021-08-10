import { Box, Button, LinearProgress, Pagination, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import vegetableApi from 'api/vegetableApi';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductFilters from '../components/ProductFilters';
import ProductTable from '../components/ProductTable';
import {
    managementActions,
    selectManagementLoading,
    selectProductList,
    selectProductListFilter,
    selectProductListPagination,
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

const ListPage = () => {
    const classes = useStyles();
    const match = useRouteMatch();
    const history = useHistory();

    const loading = useSelector(selectManagementLoading);
    const productList = useSelector(selectProductList);
    const filter = useSelector(selectProductListFilter);
    const pagination = useSelector(selectProductListPagination);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(managementActions.fetchListProduct(filter));
    }, [dispatch, filter]);

    const handlePageChange = (e, page) => {
        dispatch(
            managementActions.setFilter({
                ...filter,
                _page: page,
            })
        );
    };

    const handleSearchChange = (newFilter) => {
        dispatch(managementActions.setFilterWithDebounce(newFilter));
    };

    const handleFilterChange = (newFilter) => {
        dispatch(managementActions.setFilter(newFilter));
    };

    const handleRemoveVegetable = async (product) => {
        try {
            const data = { ...product, deletedAt: true };
            await vegetableApi.update(data);

            toast.success('Remove Vegetable successfully!');

            const newFilter = { ...filter };
            dispatch(managementActions.setFilter(newFilter));
        } catch (error) {
            alert('Failed to fetch vegetable', error);
        }
    };

    const handleEditVegetable = async (product) => {
        console.log('product', product);
        localStorage.setItem('product', JSON.stringify(product));
        history.push(`${match.url}/${product.id}`);
    };

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant='h4'>Product</Typography>

                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary'>
                        Add new product
                    </Button>
                </Link>
            </Box>

            <Box sx={{ my: 3 }}>
                <ProductFilters
                    filter={filter}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            <ProductTable
                productList={productList}
                onEdit={handleEditVegetable}
                onRemove={handleRemoveVegetable}
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

ListPage.propTypes = {};

export default ListPage;
