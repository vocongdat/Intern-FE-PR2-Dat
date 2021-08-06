import { Grid } from '@material-ui/core';
import CardProduct from 'components/Common/Client/CardProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectVegetableFilter,
    selectVegetableList,
    selectVegetableLoading,
    vegetableActions,
} from '../vegetableSlice';
import LoadingVegetables from './LoadingVegetables';
import PaginationCard from './PaginationCard';
import SortVegetables from './SortVegetables';

const gridCardStyle = {
    my: 4,
    mx: 'auto',
    position: 'relative',
};

const VegetableList = () => {
    const vegetableList = useSelector(selectVegetableList);
    const loading = useSelector(selectVegetableLoading);
    const filter = useSelector(selectVegetableFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(vegetableActions.fetchVegetableList(filter));
    }, [dispatch, filter]);

    return (
        <Grid container spacing={3} sx={gridCardStyle}>
            <Grid item xs={12}>
                <SortVegetables />
            </Grid>

            {loading ? (
                <LoadingVegetables />
            ) : (
                vegetableList.map((vegetableInfo) => (
                    <Grid item xs={3} key={vegetableInfo.id}>
                        <CardProduct vegetableInfo={vegetableInfo} />
                    </Grid>
                ))
            )}

            <Grid item xs={12}>
                <PaginationCard />
            </Grid>
        </Grid>
    );
};

VegetableList.propTypes = {};

export default VegetableList;
