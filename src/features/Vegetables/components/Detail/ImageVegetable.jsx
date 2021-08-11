import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { v4 as uuid } from 'uuid';
import { Skeleton } from '@material-ui/core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageVegetable = ({ imageList, loading }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = imageList.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    return (
        <Box sx={{ maxWidth: 400, mt: 8, flexGrow: 1 }}>
            {loading ? (
                <Skeleton variant='rectangular' width={400} height={350} />
            ) : (
                <>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {imageList.map((step, index) => (
                            <div key={uuid()}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        component='img'
                                        sx={{
                                            height: 350,
                                            display: 'block',
                                            maxWidth: 400,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step}
                                        alt={step}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position='static'
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size='small'
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </>
            )}
        </Box>
    );
};

ImageVegetable.propTypes = {
    imageList: PropTypes.array,
    loading: PropTypes.bool,
};

ImageVegetable.defaultProps = {
    imageList: [],
    loading: true,
};

export default ImageVegetable;
