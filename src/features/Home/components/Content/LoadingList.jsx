import { Skeleton, Stack } from '@material-ui/core';

const LoadingList = () => (
    <Stack spacing={3}>
        <Skeleton variant='rectangular' width={384} height={130} />
        <Skeleton variant='rectangular' width={384} height={130} />
        <Skeleton variant='rectangular' width={384} height={130} />
    </Stack>
);

export default LoadingList;
