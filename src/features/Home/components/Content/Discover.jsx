import { Button, Grid, Typography } from '@material-ui/core';
import CardProduct from 'components/Common/Client/CardProduct';
import Title from 'features/Home/components/Title/Title';
import {
    discoverActions,
    selectDiscoverList,
    selectLoadingDiscover,
} from 'features/Home/discoverSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import CardList from '../CardList/CardList';
import LoadingHome from './LoadingHome';
import LoadingList from './LoadingList';

const gridCardStyle = {
    my: 4,
    mx: 'auto',
    position: 'relative',
    textAlign: 'center',
};

const Discover = () => {
    const dispatch = useDispatch();

    const discoverList = useSelector(selectDiscoverList);
    const loading = useSelector(selectLoadingDiscover);

    const { trendingVegetable, newVegetable, bestSellerVegetable } = discoverList;

    useEffect(() => {
        dispatch(discoverActions.fetchVegetableDiscover());
    }, [dispatch]);

    return (
        <>
            <Grid item xs={12}>
                <Title header='Khám phá' subHeader='NÔNG SẢN ĐÀ LẠT' />
            </Grid>

            <Grid container spacing={3} sx={gridCardStyle}>
                {loading ? (
                    <LoadingHome />
                ) : (
                    trendingVegetable.map((vegetableInfo) => (
                        <Grid item xs={3} key={vegetableInfo.id}>
                            <CardProduct vegetableInfo={vegetableInfo} />
                        </Grid>
                    ))
                )}
            </Grid>

            <Link to='/products' style={{ textDecoration: 'none', margin: 'auto' }}>
                <Button variant='contained' color='primary'>
                    Xem thêm
                </Button>
            </Link>

            <Grid container spacing={3} sx={{ mt: 3, mb: 8 }}>
                <Grid item xs={4}>
                    <Banner />
                </Grid>

                <Grid item xs={4}>
                    <Typography variant='h5' sx={{ mb: 3 }}>
                        Sản phẩm mới
                    </Typography>
                    {loading ? (
                        <LoadingList />
                    ) : (
                        newVegetable.map((vegetableInfo) => (
                            <CardList key={vegetableInfo.id} vegetableInfo={vegetableInfo} />
                        ))
                    )}
                </Grid>

                <Grid item xs={4}>
                    <Typography variant='h5' sx={{ mb: 3 }}>
                        Sản phẩm mua nhiều
                    </Typography>

                    {loading ? (
                        <LoadingList />
                    ) : (
                        bestSellerVegetable.map((vegetableInfo) => (
                            <CardList key={vegetableInfo.id} vegetableInfo={vegetableInfo} />
                        ))
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Discover;
