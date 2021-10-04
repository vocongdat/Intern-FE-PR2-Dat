import PropTypes from 'prop-types';

const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
        return setshowGoTop('goTop');
    }
    if (scrollPosition < 50) {
        return setshowGoTop('goTopHidden');
    }
};

const ScrollButton = (props) => (
    <>
        <div className={props.showGoTop} onClick={props.scrollUp}>
            <button className='goTop'>
                <i className='goTop__text fas fa-chevron-up' />
            </button>
        </div>
    </>
);

ScrollButton.propTypes = {};

export default ScrollButton;
