import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    dashboardActions,
    selectDashboardList,
    selectDashboardLoading,
    selectHighestSoldList,
    selectHighestViewedList,
    selectLowestSoldList,
    selectLowestViewedList,
} from '../dashboardSlice';
import LineChart from '../components/LineChart';
import RankingList from '../components/RankingList';
import StatisticItem from '../components/StatisticItem';
import Widget from '../components/Widget';

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
            <div style={{ height: '500px', marginTop: 10 }}>
                <Grid container spacing={3}>
                    <Grid item sm={8} xs={12}>
                        <LineChart data={statistics} />
                    </Grid>
                </Grid>
            </div>
            <Box sx={{ position: 'relative', paddingTop: 'spacing(1)' }}>
                <Grid container spacing={3} sx={{ my: 4 }}>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticItem
                            icon={<PageviewIcon fontSize='large' color='primary' />}
                            label='Tổng lượt xem'
                            value={totalViewed}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <StatisticItem
                            icon={<ShoppingCartIcon fontSize='large' color='primary' />}
                            label='Tổng hàng sản phẩm đã bán'
                            value={totalSold}
                        />
                    </Grid>
                </Grid>

                {/* All students rankings */}
                <Box mt={5}>
                    <Typography variant='h4'>Statistics Vegetables</Typography>

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
Summary.propTypes = {};

export default Summary;
