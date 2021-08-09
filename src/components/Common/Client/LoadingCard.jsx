import Skeleton from '@material-ui/core/Skeleton';
import Stack from '@material-ui/core/Stack';

const LoadingCard = () => (
    <Stack spacing={1}>
        <Skeleton variant='rectangular' height={250} />
        <Skeleton variant='text' />
        <Skeleton variant='text' />
    </Stack>
);

export default LoadingCard;
