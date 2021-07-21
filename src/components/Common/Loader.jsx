import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Loader = () => (
    <Box sx={{ display: 'flex' }}>
        <CircularProgress />
    </Box>
);

export default Loader;
