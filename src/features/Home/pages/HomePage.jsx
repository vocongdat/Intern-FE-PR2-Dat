import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import Blogs from '../components/Content/Blogs';
import Cooperation from '../components/Content/Cooperation';
import Customer from '../components/Content/Customer';
import Discover from '../components/Content/Discover';
import Introduce from '../components/Content/Introduce';
import Welcome from '../components/Content/Welcome';
import Slides from './Slides';

const HomePage = () => (
    <>
        <Slides />

        <Container maxWidth='lg'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Welcome />

                    <Introduce />

                    <Discover />
                </Grid>
            </Box>
        </Container>

        <Customer />

        <Container maxWidth='lg'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Blogs />
                </Grid>
            </Box>
        </Container>

        <Cooperation />
    </>
);
export default HomePage;
