import { Avatar, Paper, Rating, Stack, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Comment = ({ name, comment, avatar, rating, time }) => (
    <Stack direction='row' justifyContent='start' spacing={{ xs: 1, sm: 1, md: 1 }}>
        <Stack spacing={2} direction='row' alignItems='center' sx={{ mr: 4 }}>
            <Avatar alt={name} src={avatar} />
        </Stack>
        <Paper sx={{ p: 2, flex: 1 }}>
            <Typography sx={{ color: 'text.secondary' }} variant='h6' component='h4'>
                {name}
            </Typography>
            <Rating size='small' name='read-only' value={rating} readOnly />
            <Typography>{comment}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14, textAlign: 'end' }}>
                {time}
            </Typography>
        </Paper>
    </Stack>
);

Comment.propTypes = {
    name: PropTypes.string,
    comment: PropTypes.string,
    avatar: PropTypes.string,
    rating: PropTypes.number,
    time: PropTypes.string,
};

Comment.defaultProps = {
    name: '',
    comment: '',
    avatar: '',
    rating: 0,
    time: '',
};

export default Comment;
