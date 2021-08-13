import { Box, Grid, LinearProgress, Stack, Typography } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LineChart from '../components/LineChart';
import RankingList from '../components/RankingList';
import StatisticItem from '../components/StatisticItem';
import Widget from '../components/Widget';
import {
    dashboardActions,
    selectDashboardList,
    selectDashboardLoading,
    selectHighestSoldList,
    selectHighestViewedList,
    selectLowestSoldList,
    selectLowestViewedList,
} from '../dashboardSlice';

const Summary = () => {
    const statistics = useSelector(selectDashboardList);
    const loading = useSelector(selectDashboardLoading);
    const highestViewedList = useSelector(selectHighestViewedList);
    const lowestViewedList = useSelector(selectLowestViewedList);
    const highestSoldList = useSelector(selectHighestSoldList);
    const lowestSoldList = useSelector(selectLowestSoldList);

    const [totalViewed, setTotalViewed] = useState(0);
    const [totalSold, setTotalSold] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dashboardActions.fetchDashboardData());
        const valueTotalViewed = statistics.reduce((acc, cur) => acc + cur.viewed, 0);
        const valueTotalSold = statistics.reduce((acc, cur) => acc + cur.sold, 0);
        setTotalViewed(valueTotalViewed);
        setTotalSold(valueTotalSold);
    }, [totalViewed, totalSold]);

    return (
        <>
            {loading && (
                <LinearProgress sx={{ position: 'absolute', top: 'spacing(-1)', width: '100%' }} />
            )}
            <Stack
                direction='row'
                justifyContent='space-around'
                alignItems='center'
                spacing={2}
                sx={{ mt: 7 }}
            >
                <LineChart data={statistics} />
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography variant='h4'>Tổng quan</Typography>
                    <StatisticItem
                        icon={<PageviewIcon fontSize='large' color='primary' />}
                        label='Tổng lượt xem'
                        value={totalViewed}
                    />
                    <StatisticItem
                        icon={<ShoppingCartIcon fontSize='large' color='primary' />}
                        label='Tổng hàng sản phẩm đã bán'
                        value={totalSold}
                    />
                </Stack>
            </Stack>

            <Box sx={{ position: 'relative', paddingTop: 'spacing(1)' }}>
                <Box mt={5}>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>
                        Xếp hạng
                    </Typography>

                    <Box my={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Widget title='Sản phẩm có lượt xem nhiều nhất'>
                                    <RankingList listData={highestViewedList} type='viewed' />
                                </Widget>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Widget title='Sản phẩm có lượt xem ít nhất'>
                                    <RankingList listData={lowestViewedList} type='viewed' />
                                </Widget>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <Widget title='Sản phẩm bán được nhiều nhất'>
                                    <RankingList listData={highestSoldList} type='sold' />
                                </Widget>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Widget title='Sản phẩm bán được ít nhất'>
                                    <RankingList listData={lowestSoldList} type='sold' />
                                </Widget>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Summary;
