import {
    alpha,
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/styles';
import { visuallyHidden } from '@material-ui/utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatNumber, truncateString } from 'utils';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 40,
        padding: '0 30px',
    },
});

function createData(
    id,
    name,
    price,
    weight,
    quantity,
    images,
    description,
    categoryName,
    slug,
    createdAt,
    updatedAt
) {
    return {
        id,
        name,
        price,
        weight,
        quantity,
        images,
        description,
        categoryName,
        slug,
        createdAt,
        updatedAt,
    };
}

const headCells = [
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Thứ tự',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Tên sản phẩm (Chuỗi)',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Hình ảnh',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Phân loại (Chuỗi)',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Giá (Số)',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: 'Thời gian cập nhật',
    },
    {
        id: uuid(),
        numeric: false,
        disablePadding: true,
        label: '',
    },
];

const EnhancedTableHead = ({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const ProductTable = ({ productList, onEdit, onRemove, actionName, titleAction }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(14);

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const rows = [];

    if (productList.length > 0) {
        productList.map((product) => {
            const row = createData(
                product.id,
                product.name,
                product.price,
                product.weight,
                product.quantity,
                product.images,
                product.description,
                product.categoryName,
                product.slug,
                product.createdAt,
                product.updatedAt
            );
            return rows.push(row);
        });
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleRemoveConfirm = (product) => {
        onRemove?.(product);
        setOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            console.log(event.target.checked);
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper} sx={{ maxHeight: '84vh' }}>
                <Table
                    className={classes.table}
                    size='small'
                    aria-label='vegetable table'
                    stickyHeader
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />

                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding='checkbox'>
                                        <Checkbox
                                            color='primary'
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align='left'>{index + 1}</TableCell>

                                    <TableCell
                                        component='th'
                                        id={labelId}
                                        scope='row'
                                        padding='none'
                                        align='left'
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell padding='none'>
                                        <Avatar
                                            variant='rounded'
                                            alt={row.name}
                                            src={row.images[0]}
                                            sx={{ width: 56, height: 56, my: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell padding='none'>{row?.categoryName}</TableCell>
                                    <TableCell padding='none'>
                                        {formatNumber(row?.price)}.000 đ
                                    </TableCell>
                                    <TableCell padding='none'>{row?.updatedAt}</TableCell>
                                    <TableCell padding='none'>
                                        <Button
                                            size='small'
                                            className={classes.edit}
                                            color='primary'
                                            onClick={() => onEdit?.(row)}
                                        >
                                            {actionName}
                                        </Button>

                                        <Button
                                            size='small'
                                            color='secondary'
                                            onClick={() => handleRemoveClick(row)}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {!titleAction ? 'Chuyển vào thùng rác?' : 'Xóa vĩnh viễn'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {!titleAction
                            ? `Bạn có chắc chắn muốn chuyển "${selectedProduct?.name}" vào
                        thùng rác?`
                            : titleAction}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary' variant='outlined'>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => handleRemoveConfirm(selectedProduct)}
                        variant='contained'
                        autoFocus
                    >
                        {!titleAction ? 'Chuyển vào thùng rác' : 'Xóa'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

ProductTable.propTypes = {
    productList: PropTypes.array,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    actionName: PropTypes.string,
    titleAction: PropTypes.string,
};

ProductTable.defaultProps = {
    productList: [],
    onEdit: null,
    onRemove: null,
    actionName: 'Sửa',
    titleAction: '',
};

export default ProductTable;
