import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { LoadingButton } from '@material-ui/lab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import RatingVegetable from './RatingVegetable';

const DetailVegetable = ({ name, description, weight, quantity, viewed, sold }) => {
    const [value, setValue] = useState('1');

    const [loading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleClick() {
        setLoading(true);
    }

    return (
        <Box sx={{ width: '100%', minHeight: 600, typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label='lab API tabs example'>
                        <Tab label='MÔ TẢ' value='1' />
                        <Tab label='THÔNG TIN BỔ SUNG' value='2' />
                        <Tab label='ĐÁNH GIÁ' value='3' />
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
                        Cân nặng: {weight.join(', ')}
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
                    <Typography variant='body1' gutterBottom>
                        Chưa có đánh giá nào. Hãy là người đầu tiên nhận xét “{name}”
                    </Typography>
                    <RatingVegetable />
                    <Box
                        component='form'
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            required
                            id='email'
                            label='Nhận xét'
                            helperText='Nhận xét của bạn'
                            type='text'
                            size='small'
                            minRows={4}
                            fullWidth
                            multiline
                        />
                        <TextField
                            required
                            id='nameClient'
                            label='Tên'
                            helperText='Tên của bạn'
                            type='text'
                            size='small'
                            defaultValue=''
                            fullWidth
                        />
                        <TextField
                            required
                            id='email'
                            label='Email'
                            helperText='Email của bạn'
                            type='email'
                            defaultValue='@gmail.com'
                            size='small'
                            fullWidth
                        />
                        <LoadingButton
                            color='primary'
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition='center'
                            variant='contained'
                        >
                            Đánh giá
                        </LoadingButton>
                    </Box>
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

export default DetailVegetable;
