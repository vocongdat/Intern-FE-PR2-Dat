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

const gridCardStyle = {
    my: 4,
    mx: 'auto',
    position: 'relative',
};

const RecentViewed = () => {
    const vegetableList = useSelector(selectVegetableList);
    const loading = useSelector(selectVegetableLoading);
    const filter = useSelector(selectVegetableFilter);

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

RecentViewed.propTypes = {};

export default RecentViewed;
