import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Stack, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import cartApi from 'api/cartApit';
import { InputField } from 'components/FormFields';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    phone: yup.string().required('Please enter name.'),
    address: yup.string().required('Please enter name.'),
});

const labelStyle = {
    minWidth: 200,
};

const dividerStyle = {
    my: 1,
};

const Checkout = ({ initialValues, handleCloseModal }) => {
    const { t } = useTranslation();

    const handleFormSubmit = async (e) => {
        await cartApi.addOrder(e);
        localStorage.setItem('countCart', 0);

        handleCloseModal();
    };

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Stack direction='column' spacing={2}>
                <Stack direction='column' spacing={2}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Stack
                            direction='row'
                            spacing={2}
                            sx={{ mt: 1 }}
                            justifyContent='space-between'
                        >
                            <Typography sx={labelStyle}>Tên của bạn</Typography>
                            <InputField name='name' control={control} label='Name' />
                        </Stack>

                        <Divider light flexItem sx={dividerStyle} />
                        <Stack
                            direction='row'
                            sx={{ mt: 1 }}
                            spacing={2}
                            justifyContent='space-between'
                        >
                            <Typography sx={labelStyle}>Số điện thoại:</Typography>
                            <InputField name='phone' control={control} label='Phone' />
                        </Stack>

                        <Divider light flexItem sx={dividerStyle} />
                        <Stack
                            direction='row'
                            sx={{ mt: 1 }}
                            spacing={2}
                            justifyContent='space-between'
                        >
                            <Typography sx={labelStyle}>Địa chỉ nhận hàng:</Typography>
                            <InputField name='address' control={control} label='Address' />
                        </Stack>

                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            {isSubmitting && <CircularProgress size={16} color='primary' />}
                            {t('order')}
                        </Button>
                    </form>
                </Stack>
            </Stack>
        </>
    );
};

Checkout.propTypes = {
    initialValues: PropTypes.object,
    handleCloseModal: PropTypes.func,
};

Checkout.defaultProps = {
    initialValues: {},
    handleCloseModal: null,
};

export default Checkout;
