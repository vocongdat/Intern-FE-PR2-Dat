import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Title from '../Title/Title';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.grey[300],
    backgroundColor: theme.palette.primary.light,
}));

const MyList = styled(List)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    cursor: 'default',
    transition: `${theme.transitions.create(['color'], {
        duration: theme.transitions.duration.standard,
    })}`,
    '& > *': {
        transition: `${theme.transitions.create(['color'], {
            duration: theme.transitions.duration.standard,
        })}`,
        '&:hover, &:focus': {
            '& .MuiSvgIcon-root': {
                color: theme.palette.common.white,
            },
        },
    },
}));

const Welcome = () => {
    const CONTENT = [
        {
            icon: <LocalShippingIcon sx={{ color: 'grey.200', fontSize: 48 }} />,
            title: 'FREE SHIPPING',
            subTitle: 'Trên 1 triệu',
        },
        {
            icon: <AccessTimeIcon sx={{ color: 'grey.200', fontSize: 48 }} />,
            title: 'HOTLINE',
            subTitle: 'Hỗ trợ 24/7',
        },
        {
            icon: <PersonPinCircleIcon sx={{ color: 'grey.200', fontSize: 48 }} />,
            title: 'GIAO HÀNG TẬN NHÀ',
            subTitle: 'Nhanh',
        },
        {
            icon: <AcUnitIcon sx={{ color: 'grey.200', fontSize: 48 }} />,
            title: 'TƯƠI NGON',
            subTitle: 'Không đông lạnh',
        },
    ];

    return (
        <>
            <Grid item xs={12}>
                <Title subHeader='chào mừng đến farm đà lạt' />
            </Grid>

            <Grid item xs={12}>
                <Item>
                    <MyList>
                        {CONTENT.map((item, index) => (
                            <ListItem key={item.title}>
                                <ListItemIcon sx={{ marginRight: 1 }}>{item.icon}</ListItemIcon>

                                <ListItemText>
                                    <Typography
                                        sx={{
                                            fontWeight: 'medium',
                                            color: 'common.white',
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography>{item.subTitle}</Typography>
                                </ListItemText>

                                {index !== CONTENT.length - 1 ? (
                                    <Divider
                                        orientation='vertical'
                                        variant='fullWidth'
                                        color='white'
                                    />
                                ) : (
                                    ''
                                )}
                            </ListItem>
                        ))}
                    </MyList>
                </Item>
            </Grid>
        </>
    );
};

export default Welcome;
