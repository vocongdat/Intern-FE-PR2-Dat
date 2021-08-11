import { Grid, Paper, Typography } from '@material-ui/core';
import CardProduct from 'components/Common/Client/CardProduct';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVegetableFilter, selectVegetableLoading, vegetableActions } from '../vegetableSlice';

const gridCardStyle = {
    my: 4,
};

const RecentViewed = () => {
    const dispatch = useDispatch();
    const vegetableRecent = JSON.parse(localStorage.getItem('vegetableRecent'));

    const loading = useSelector(selectVegetableLoading);
    const filter = useSelector(selectVegetableFilter);

    useEffect(() => {
        dispatch(vegetableActions.fetchVegetableList(filter));
    }, [dispatch, filter]);

    return (
        <Paper>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
                Sản phẩm xem gần đây
            </Typography>

            <Grid container spacing={3} sx={gridCardStyle}>
                {vegetableRecent.map((vegetableInfo) => (
                    <Grid item xs={3} key={vegetableInfo.id}>
                        <CardProduct vegetableInfo={vegetableInfo} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default RecentViewed;
