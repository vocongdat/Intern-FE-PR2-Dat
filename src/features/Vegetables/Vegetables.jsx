import { Grid } from '@material-ui/core';
import { CardProduct } from 'components/Common/Client/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectVegetableFilter,
    selectVegetableList,
    selectVegetableLoading,
    selectVegetablePagination,
    vegetableActions,
} from './vegetableSlice';

const gridCardStyle = {
    my: 4,
    mx: 'auto',
    position: 'relative',
};

const Vegetables = () => {
    const vegetableList = useSelector(selectVegetableList);
    const loading = useSelector(selectVegetableLoading);
    const filter = useSelector(selectVegetableFilter);
    const pagination = useSelector(selectVegetablePagination);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(vegetableActions.fetchVegetableList(filter));
    }, [dispatch, filter]);

    return (
        <Grid container spacing={3} sx={gridCardStyle}>
            {vegetableList.map((vegetableInfo) => (
                <Grid item xs={3} key={vegetableInfo.id}>
                    <CardProduct vegetableInfo={vegetableInfo} />
                </Grid>
            ))}
        </Grid>
    );
};

Vegetables.propTypes = {};

export default Vegetables;
