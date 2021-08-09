import * as React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import i18next from 'i18next';

const MultiLanguage = () => {
    const [language, setLanguage] = React.useState('vi');

    const handleChangeLanguage = (event, newLanguage) => {
        setLanguage(newLanguage);
        i18next.changeLanguage(newLanguage);
    };

    return (
        <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleChangeLanguage}
            aria-label='text alignment'
        >
            <ToggleButton size='small' value='vi' aria-label='vietnamese'>
                VI
            </ToggleButton>
            <ToggleButton size='small' value='en' aria-label='english'>
                EN
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

MultiLanguage.propTypes = {};

export default MultiLanguage;
