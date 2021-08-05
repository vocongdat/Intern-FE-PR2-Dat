import { makeStyles } from '@material-ui/styles';
import { VIDEOS } from 'constants/index';
import React from 'react';

const useStyles = makeStyles({
    video: {
        objectFit: 'cover',
        width: '100%',
        height: '570px',
        position: 'fixed',
        zIndex: 1,
    },
    heroContainer: {
        background: 'url("assets/images/bg_02.jpg") center center/cover no-repeat',
        height: '570px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',
        objectFit: 'contain',
    },
    overlays: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0c0c0c',
        mixBlendMode: 'overlay',
    },
    content: {
        position: 'relative',
        zIndex: 10,
        transform: 'translateY(-50%)',
        top: '50%',
        textAlign: 'center',
        color: 'hsl(0,0%,100%,1)',
    },
    header: {
        fontFamily: "'Great Vibes', cursive",
        fontSize: 74,
        fontWeight: 700,
        '& ::before': {
            content: '',
            background:
                'url(https://organik.thememove.com/wp-content/uploads/2016/10/slider-home-03-slide2-object-01.png)',
            width: 70,
            height: 84,
        },
    },
    subContent: {
        fontSize: 16,
        marginTop: 18,
    },
});

const HeroSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.heroContainer}>
            <video className={classes.video} src={VIDEOS.GRAPE_VIDEO} autoPlay muted loop />

            <div className={classes.overlays} />

            <div className={classes.content}>
                <h2 className={classes.header}>Natural taste</h2>
                <h2 className={classes.header}>from</h2>
                <h2 className={classes.header}>the Farm</h2>
                <h3 className={classes.subContent}>REACH FOR A HEALTHIER YOU WITH ORGANIC FOODS</h3>
            </div>
        </div>
    );
};
export default HeroSection;
