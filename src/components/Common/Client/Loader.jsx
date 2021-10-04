import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        fontWeight: 'bold',
        fontFamily: 'monospace',
        fontSize: '30px',
        letterSpacing: '10ch',
        width: '10ch',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textShadow: `calc(-1*10ch) 0, calc(-2*10ch) 0, calc(-3*10ch) 0, calc(-4*10ch) 0,calc(-5*10ch) 0, calc(-6*10ch) 0, calc(-7*10ch) 0, calc(-8*10ch) 0, calc(-9*10ch) 0,`,
        animation: `$c6 2s infinite`,
        '&:before': {
            content: 'Loading...',
        },
    },

    '@keyframes c6': {
        '20%': {
            textShadow:
                'calc(-1*10ch) 0, calc(-2*10ch) 0 red, calc(-3*10ch) 0, calc(-4*10ch) 0 #ffa516,calc(-5*10ch) 0 #63fff4, calc(-6*10ch) 0, calc(-7*10ch) 0, calc(-8*10ch) 0 green, calc(-9*10ch) 0,',
        },
        '40%': {
            textShadow:
                'calc(-1*10ch) 0, calc(-2*10ch) 0 red, calc(-3*10ch) 0 #e945e9, calc(-4*10ch) 0,calc(-5*10ch) 0 green, calc(-6*10ch) 0 orange, calc(-7*10ch) 0, calc(-8*10ch) 0 green, calc(-9*10ch) 0,',
        },
        '60%': {
            textShadow:
                'calc(-1*10ch) 0 lightblue, calc(-2*10ch) 0, calc(-3*10ch) 0 #e945e9, calc(-4*10ch) 0,calc(-5*10ch) 0 green, calc(-6*10ch) 0, calc(-7*10ch) 0 yellow, calc(-8*10ch) 0 #ffa516, calc(-9*10ch) 0 red,',
        },
        '80%': {
            textShadow:
                'calc(-1*10ch) 0 lightblue, calc(-2*10ch) 0 yellow, calc(-3*10ch) 0 #63fff4, calc(-4*10ch) 0 #ffa516,calc(-5*10ch) 0 red, calc(-6*10ch) 0, calc(-7*10ch) 0 grey, calc(-8*10ch) 0 #63fff4, calc(-9*10ch) 0 ,',
        },
    },
});

const Loader = () => {
    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <div className={classes.root} />
            <p>Loading</p>
        </Box>
    );
};

export default Loader;
