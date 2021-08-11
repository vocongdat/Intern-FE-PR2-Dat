import * as React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import i18next from 'i18next';
import cookies from 'js-cookie';

const MultiLanguage = () => {
    const currentLanguageCode = cookies.get('i18next') || 'vi';
    const [language, setLanguage] = React.useState(currentLanguageCode);

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
