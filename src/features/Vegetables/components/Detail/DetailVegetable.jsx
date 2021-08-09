import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Button,
    CircularProgress,
    Divider,
    Rating,
    Stack,
    Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import StarIcon from '@material-ui/icons/Star';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import managementApi from 'api/managementApi';
import { InputField } from 'components/FormFields';
import { selectLoading, selectUserInfo } from 'features/User/userSlice';
import { selectComment, vegetableActions } from 'features/Vegetables/vegetableSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import Comment from './Comment';

const schema = yup.object().shape({
    comment: yup
        .string()
        .min(5, 'Vui lòng điền ít nhất 5 ký tự')
        .required('Vui lòng điền tên đăng nhập'),
});

const DetailVegetable = ({ name, description, weight, quantity, viewed, sold }) => {
    const { t } = useTranslation();
    const { search } = useLocation();

    const [valueTab, setValueTab] = useState('1');
    const [error, setError] = useState('');
    const [valueStart, setStart] = React.useState(2);
    const [hoverStart, setHoverStart] = React.useState(-1);

    const userInfo = useSelector(selectUserInfo);
    const commentList = useSelector(selectComment);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    useEffect(() => {
        const id = search.split('=')[1];
        dispatch(vegetableActions.fetchVegetableById(id));
    }, [dispatch, isSubmitting]);

    const handleComment = async (e) => {
        setError('');
        const formValue = {
            vegetableId: search.split('=')[1],
            content: e.comment,
            name: userInfo.name,
            rating: valueStart,
            avatar: userInfo.avatar,
        };
        await managementApi.addComment(formValue);
    };

    const idCurrentUser = localStorage.getItem('access_token');

    return (
        <Box sx={{ width: '100%', minHeight: 600, typography: 'body1' }}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab label={t('detail')} value='1' />
                        <Tab label={t('information')} value='2' />
                        <Tab label={t('rating')} value='3' />
                    </TabList>
                </Box>
                <TabPanel value='1'>
                    {description.map((paragraph) => (
                        <Typography key={uuid()} variant='body1' gutterBottom>
                            {paragraph}
                        </Typography>
                    ))}
                </TabPanel>
                <TabPanel value='2'>
                    <Typography variant='body1' gutterBottom>
                        {`${t('weight')}: ${weight.join(', ')}`}
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Sản phẩm còn lại: {quantity}
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Lượt xem: {viewed}
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Đã bán: {sold} sản phẩm
                    </Typography>
                </TabPanel>
                <TabPanel value='3'>
                    {commentList.length <= 0 ? (
                        <Typography variant='body1' gutterBottom>
                            Chưa có đánh giá nào. Hãy là người đầu tiên nhận xét “{name}”
                        </Typography>
                    ) : (
                        <Stack direction='column' spacing={2}>
                            {commentList.map((comment) => (
                                <Comment
                                    key={uuid()}
                                    name={comment.name}
                                    comment={comment.content}
                                    avatar={comment.avatar}
                                    rating={comment.rating}
                                    time={comment.createdAt}
                                />
                            ))}
                        </Stack>
                    )}
                    <Divider sx={{ mt: 4 }} />
                    <Typography variant='h6' gutterBottom>
                        Đánh giá ngay
                    </Typography>
                    <Rating
                        name='hover-feedback'
                        value={valueStart}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setStart(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHoverStart(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
                    />
                    <form onSubmit={handleSubmit(handleComment)}>
                        <InputField control={control} label='Nhận xét' name='comment' />

                        {error && <Alert severity='error'>{error}</Alert>}

                        <Button
                            fullWidth
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={!idCurrentUser || isSubmitting}
                            sx={{ mr: 4 }}
                        >
                            {isSubmitting && <CircularProgress size={16} color='primary' />}
                            {t('rating')}
                        </Button>
                    </form>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

DetailVegetable.propTypes = {
    name: PropTypes.string,
    description: PropTypes.array,
    weight: PropTypes.array,
    quantity: PropTypes.number,
    viewed: PropTypes.number,
    sold: PropTypes.number,
};

DetailVegetable.defaultProps = {
    name: '',
    description: [],
    weight: [],
    quantity: 0,
    viewed: 0,
    sold: 0,
};

export default React.memo(DetailVegetable);
