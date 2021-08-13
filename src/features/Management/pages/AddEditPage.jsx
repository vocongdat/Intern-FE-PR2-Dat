import { Alert, Box, Snackbar, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import vegetableApi from 'api/vegetableApi';
import { VEGETABLES_PATH } from 'constants/index';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';

const AddEditPage = () => {
    const history = useHistory();
    const { productId } = useParams();
    const isEdit = Boolean(productId);
    let productInfo = JSON.parse(localStorage.getItem('product'));

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleProductFormSubmit = async (formValues) => {
        if (isEdit) {
            await vegetableApi.update(formValues);
        } else {
            await vegetableApi.add(formValues);
        }

        setOpen(true);

        history.push(VEGETABLES_PATH);
    };
    if (!productId) {
        productInfo = {};
    }
    const initialValues = {
        name: '',
        price: 0,
        weight: [],
        description: [],
        slug: '',
        ...productInfo,
    };

    return (
        <>
            <Box sx={{ ml: 2 }}>
                <Link to={VEGETABLES_PATH}>
                    <Typography variant='caption' style={{ display: 'flex', alignItems: 'center' }}>
                        <ChevronLeft /> Back to product list
                    </Typography>
                </Link>

                <Typography variant='h4'>
                    {isEdit ? 'Update product info' : 'Add new product'}
                </Typography>

                {(!isEdit || Boolean(productInfo)) && (
                    <Box mt={3}>
                        <ProductForm
                            initialValues={initialValues}
                            onSubmit={handleProductFormSubmit}
                        />
                    </Box>
                )}
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    Cập nhập/Lưu thành công
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddEditPage;
