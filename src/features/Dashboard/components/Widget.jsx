import { Box, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';

const root = {
    padding: 'spacing(2)',
    border: `1px solid divider`,
};

const Widget = ({ title, children }) => (
    <Paper sx={root}>
        <Typography variant='button' component='p' sx={{ textAlign: 'center', pt: 2 }}>
            {title}
        </Typography>

        <Box mt={2}>{children}</Box>
    </Paper>
);

Widget.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

Widget.defaultProps = {
    title: '',
    children: null,
};

export default Widget;
