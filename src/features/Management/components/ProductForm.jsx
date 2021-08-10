import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter name.')
        .test('two-words', 'Please enter at least two words', (value) => {
            if (!value) return true;

            const parts = value?.split(' ') || [];
            return parts.filter((x) => Boolean(x)).length >= 2;
        }),
    price: yup
        .number()
        .positive('Please enter a positive number.')
        .min(1, 'Min is 1')
        .required('Please enter price')
        .typeError('Please enter a valid price.'),
    weight: yup.string('Please enter a weight').typeError('Please enter a valid weight.'),
    quantity: yup
        .number()
        .positive('Please enter a positive number.')
        .min(1, 'Min is 1')
        .required('Please enter price')
        .typeError('Please enter a valid quantity.'),
    images: yup.string('Please enter images').typeError('Please enter a valid image.'),
    description: yup.string().required('Please enter description.'),
    categoryName: yup.string('Please enter name').required('Please enter categoryName.'),
    slug: yup.string().required('Please enter slug.'),
    viewed: yup
        .number()
        .positive('Please enter a positive viewed.')
        .min(1, 'Min is 1')
        .required('Please enter price')
        .typeError('Please enter a valid viewed.'),
    sold: yup
        .number()
        .positive('Please enter a positive sold.')
        .min(1, 'Min is 1')
        .required('Please enter price')
        .typeError('Please enter a valid sold.'),
});

const ProductForm = ({ initialValues, onSubmit }) => {
    const [error, setError] = useState('');
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (e) => {
        try {
            setError('');
            await onSubmit?.(e);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box maxWidth={800} sx={{ ml: 4, mb: 4 }}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name='name' control={control} label='Name' />
                <InputField name='price' control={control} label='Price' type='number' />
                <InputField name='weight' control={control} label='Weight' />
                <InputField name='quantity' control={control} label='Quantity' type='number' />
                <InputField name='images' control={control} label='Images' />
                <InputField name='description' control={control} label='Description' />
                <InputField name='categoryName' control={control} label='Name Category' />
                <InputField name='slug' control={control} label='slug' />
                <InputField name='viewed' control={control} label='Viewed' type='number' />
                <InputField name='sold' control={control} label='Sold' type='number' />

                {error && <Alert severity='error'>{error}</Alert>}

                <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                    {isSubmitting && <CircularProgress size={16} color='primary' />}
                    Save
                </Button>
            </form>
        </Box>
    );
};

ProductForm.propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
};

ProductForm.defaultProps = {
    initialValues: {},
    onSubmit: null,
};

export default ProductForm;
