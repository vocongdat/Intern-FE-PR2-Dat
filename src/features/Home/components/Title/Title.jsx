import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import PropTypes from 'prop-types';

const Title = ({ header, subHeader }) => (
    <Paper
        align='center'
        elevation={0}
        square
        sx={{
            bgcolor: 'transparent',
            mb: 4,
            mt: 4,
            '&:hover': {
                '& .MuiSvgIcon-root': {
                    cursor: 'pointer',
                    transition: 'all 3s linear',
                    transform: 'rotate(360deg)',
                },
            },
        }}
    >
        <Typography
            variant='h3'
            component='h2'
            sx={{ fontWeight: 'regular', color: 'primary.main' }}
            gutterBottom
        >
            {header}
        </Typography>
        <Typography
            variant='h3'
            component='h2'
            sx={{
                fontWeight: 'medium',
                textTransform: 'uppercase',
                color: 'grey.[900]',
                fontSize: 40,
                letterSpacing: 2,
            }}
            gutterBottom
        >
            {subHeader}
        </Typography>

        <FilterVintageIcon color='primary' fontSize='large' />
    </Paper>
);

Title.propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
};

Title.defaultProps = {
    header: '',
    subHeader: '',
};

export default Title;
