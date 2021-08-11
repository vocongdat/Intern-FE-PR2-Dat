import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { selectClear, selectVegetableFilter, vegetableActions } from '../vegetableSlice';

const SearchProduct = () => {
    const searchRef = React.useRef();
    const dispatch = useDispatch();
    const filter = useSelector(selectVegetableFilter);
    const { t } = useTranslation();

    const handleSearchChange = (e) => {
        const newFilter = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        dispatch(vegetableActions.setFilterWithDebounce(newFilter));
    };

    return (
        <Grid item xs={12} md={6}>
            <FormControl fullWidth variant='outlined' size='small'>
                <InputLabel htmlFor='searchByName'>{t('searchByName')}</InputLabel>
                <OutlinedInput
                    id='searchByName'
                    label='Search by name'
                    endAdornment={<Search />}
                    defaultValue={filter.name_like}
                    onChange={handleSearchChange}
                    inputRef={searchRef}
                />
            </FormControl>
        </Grid>
    );
};

SearchProduct.propTypes = {};

export default SearchProduct;
