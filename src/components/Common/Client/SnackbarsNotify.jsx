import { Alert, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const SnackbarsNotify = ({ isOpen, handleClose }) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
    >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Add to card success!
        </Alert>
    </Snackbar>
);

SnackbarsNotify.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};

SnackbarsNotify.defaultProps = {
    isOpen: false,
    handleClose: null,
};

export default React.memo(SnackbarsNotify);
