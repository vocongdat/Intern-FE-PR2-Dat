import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuid } from 'uuid';

const RankingList = ({ listData, type }) => (
    <TableContainer>
        <Table size='small' aria-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell align='center'>#</TableCell>
                    <TableCell align='left'>Tên sản phẩm</TableCell>
                    <TableCell align='right'>{type === 'sold' ? 'Lượt mua' : 'Lượt xem'}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {listData.map((itemName, idx) => (
                    <TableRow key={uuid()}>
                        <TableCell align='center'>{idx + 1}</TableCell>
                        <TableCell align='left'>{itemName.name}</TableCell>
                        <TableCell align='right'>
                            {type === 'sold' ? itemName.sold : itemName.viewed}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

RankingList.propTypes = {
    listData: PropTypes.array,
    type: PropTypes.string,
};

RankingList.defaultProps = {
    listData: [],
    type: 'viewed',
};

export default RankingList;
