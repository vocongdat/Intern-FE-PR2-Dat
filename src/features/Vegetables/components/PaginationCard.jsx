import Pagination from '@material-ui/core/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectVegetablePagination,
    selectVegetableFilter,
    vegetableActions,
} from '../vegetableSlice';

const PaginationCard = () => {
    const pagination = useSelector(selectVegetablePagination);
    const filter = useSelector(selectVegetableFilter);

    const [totalPage, setTotalPage] = useState(0);

    const dispatch = useDispatch();

    const { _page, _limit, _totalRow } = pagination;

    useEffect(() => {
        setTotalPage(Math.ceil(_totalRow / _limit));
    }, [pagination]);

    const handleChange = (event, value) => {
        const params = {
            ...filter,
            _page: value,
        };
        dispatch(vegetableActions.setFilter(params));
    };

    return <Pagination count={totalPage} page={_page} color='primary' onChange={handleChange} />;
};

PaginationCard.propTypes = {};

export default PaginationCard;
