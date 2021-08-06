import { CardMedia, Grid, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '68%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PopupQuickView = ({ vegetableInfo }) => {
    const { name, images, price, weight, categoryName, description } =
        vegetableInfo;

    function createData(title, content) {
        return { title, content };
    }

    const rows = [
        createData('Đơn giá', price.join(', ')),
        createData('Khối lượng', weight.join(', ')),
        createData('Category', categoryName.join(', ')),
        createData('Số lượng', 1),
        createData('Bạn đã mua sản phẩm này', '1 lần'),
    ];

    return (
        <Paper sx={style} elevation={0}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Paper>
                        <CardMedia
                            sx={{ height: 450, transition: 'all .5s' }}
                            image={images[0]}
                            title={name}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        variant='h4'
                        sx={{
                            color: 'primary.main',
                            textAlign: 'center',
                            fontWeight: 'medium',
                        }}
                        gutterBottom
                    >
                        {name}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label='table'>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.title}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            sx={{
                                                color: 'primary.light',
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {row.title}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {row.content}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography
                        variant='subtitle1'
                        component='span'
                        sx={{
                            fontSize: 18,
                            color: 'primary.main',
                            display: 'inline-block',
                            mt: 1.8,
                        }}
                    >
                        Mô tả
                    </Typography>
                    <Typography variant='body1' component='p'>
                        <p>{description[1]}</p>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

PopupQuickView.propTypes = {
    vegetableInfo: PropTypes.object,
};

PopupQuickView.defaultProps = {
    vegetableInfo: {},
};

export default PopupQuickView;
