import { Box, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const root = {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    border: `1px solid divider`,
};

const StatisticItem = ({ icon, label, value }) => (
    <Paper sx={root}>
        <Box>{icon}</Box>

        <Box>
            <Typography variant='h5' align='right'>
                {value}
            </Typography>
            <Typography variant='caption'>{label}</Typography>
        </Box>
    </Paper>
);

StatisticItem.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
};

StatisticItem.defaultProps = {
    icon: null,
    label: '',
    value: '',
};

export default StatisticItem;
