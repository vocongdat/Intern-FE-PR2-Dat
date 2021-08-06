import { Box, Button, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Sharing from './Sharing';

const ContentVegetable = ({ name, price, weight, category }) => {
    const [weightItem, setWeightItem] = useState('');
    const [isEnable, setIsEnable] = useState(true);

    const handleWeightChange = (event) => {
        const valueWeight = event.target.value;

        setWeightItem(valueWeight);
        setIsEnable(false);
    };

    return (
        <Box sx={{ mt: 7, ml: 2 }}>
            <Typography variant='h3' component='h2' gutterBottom>
                {name}
            </Typography>

            <Typography variant='h4' component='p' color='primary.light' gutterBottom>
                {price}.000 đ
            </Typography>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    my: 4,
                }}
            >
                <Typography variant='subtitle' component='span' noWrap gutterBottom>
                    Cân nặng
                </Typography>

                <FormControl sx={{ mx: 4, minWidth: 100 }}>
                    <Select
                        labelId='weight-select-label'
                        id='weight-select'
                        value={weightItem}
                        onChange={handleWeightChange}
                        size='small'
                    >
                        {weight.map((itemWeight) => (
                            <MenuItem key={uuid()} value={itemWeight}>
                                {itemWeight}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TextField
                    id='outlined-number'
                    label='Số lượng'
                    type='number'
                    defaultValue={1}
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mr: 2, width: 100 }}
                />

                <Button variant='contained' color='primary' disabled={isEnable}>
                    Thêm vào giỏ hàng
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant='subtitle1' component='p' gutterBottom>
                Phân loại: {category}
            </Typography>

            <Sharing />
        </Box>
    );
};

ContentVegetable.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    weight: PropTypes.array,
    category: PropTypes.array,
};

ContentVegetable.defaultProps = {
    name: '',
    price: 0,
    weight: [],
    category: [],
};

export default ContentVegetable;
