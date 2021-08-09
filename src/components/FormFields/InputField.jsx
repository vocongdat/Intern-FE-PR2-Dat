import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useController } from 'react-hook-form';

export const InputField = ({ name, control, label, ...inputProps }) => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <TextField
            fullWidth
            size='small'
            margin='normal'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            variant='outlined'
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
};

InputField.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    label: PropTypes.string,
};

InputField.defaultProps = {
    name: '',
    control: null,
    label: '',
};
