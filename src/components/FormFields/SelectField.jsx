import { FormHelperText, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useController } from 'react-hook-form';

export const SelectField = ({ name, control, label, disabled, options }) => {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl
            fullWidth
            variant='outlined'
            margin='normal'
            size='small'
            disabled={disabled}
            error={invalid}
        >
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
};

SelectField.propTypes = {
    name: PropTypes.string,
    control: PropTypes.any,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array,
};

SelectField.defaultProps = {
    name: '',
    control: '',
    label: '',
    disabled: false,
    options: [],
};
