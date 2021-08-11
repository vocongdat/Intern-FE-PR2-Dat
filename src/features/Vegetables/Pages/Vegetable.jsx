import { Container, Grid } from '@material-ui/core';
import React from 'react';
import FilterVegetables from '../components/FilterVegetables';
import RecentViewed from '../components/RecentViewed';
import VegetableList from '../components/VegetableList';

const Vegetable = () => (
    <Container maxWidth='lg'>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <FilterVegetables />
            </Grid>
            <Grid item xs={9}>
                <VegetableList />
            </Grid>
            <Grid item xs={12}>
                <RecentViewed />
            </Grid>
        </Grid>
    </Container>
);

Vegetable.propTypes = {};

export default React.memo(Vegetable);
