import {
    Button,
    FormControl,
    ListItemText,
    TextField,
    Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import { IMAGES } from 'constants/index';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
    copyright: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#333333',
        color: '#696969',
    },
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'justify',
    color: '#ababab',
    backgroundColor: '#444444',
}));

const MyBox = styled(Box)({
    backgroundColor: '#444444',
    color: 'white',
});

const FooterList = styled(ListItemText)({
    cursor: 'pointer',
    '&:hover': {
        color: '#5fbd74',
    },
});

const InputEmail = styled(TextField)({
    backgroundColor: 'white',
    borderRadius: 4,
});

const infoList = ['New Products', 'Top Sellers', 'Our Blog', 'About Our Shop'];
const aboutList = ['Our Team', 'Our Blog', 'About Us', 'Secure Shopping'];

const Footer = () => {
    const classes = useStyles();

    return (
        <MyBox sx={{ flexGrow: 1 }}>
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item elevation='0'>
                            <Link to='/'>
                                <img src={IMAGES.LOGO_WHITE} alt='Logo' />
                            </Link>
                            <Typography
                                variant='body2'
                                component='p'
                                gutterBottom
                            >
                                Vietponics là nơi canh tác và tập trung các sản
                                phẩm hữu cơ từ các nhà vườn ở Đà Lạt, trong đó
                                có một số sản phẩm chọn lọc từ các khu vực đặc
                                trưng như chuối Laba ở Lâm Hà, bơ ở Bảo Lộc,
                                khoai mật ở Tà Nung
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={2}>
                        <Item elevation='0'>
                            <Typography variant='h6' gutterBottom>
                                THÔNG TIN
                            </Typography>
                            <Divider component='p' />
                            <List>
                                {infoList.map((titleInfo) => (
                                    <ListItem key={uuid()} disablePadding>
                                        <FooterList primary={titleInfo} />
                                    </ListItem>
                                ))}
                            </List>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item elevation='0'>
                            <Typography variant='h6' gutterBottom>
                                LIÊN KẾT
                            </Typography>
                            <Divider component='p' />

                            <List>
                                {aboutList.map((titleAbout) => (
                                    <ListItem key={uuid()} disablePadding>
                                        <FooterList primary={titleAbout} />
                                    </ListItem>
                                ))}
                            </List>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item elevation='0'>
                            <Typography variant='h6' gutterBottom>
                                ĐẶT MUA
                            </Typography>
                            <Divider component='p' />
                            <Typography variant='subtitle1'>
                                Nhập địa chỉ email để nhận thông tin mới nhất
                            </Typography>
                            <FormControl>
                                <InputEmail
                                    id='email-notify'
                                    variant='outlined'
                                    type='email'
                                    color='success'
                                    margin='dense'
                                    placeholder='Enter your email'
                                />
                                <Button
                                    variant='contained'
                                    color='success'
                                    endIcon={<SendIcon />}
                                >
                                    Send
                                </Button>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item className={classes.copyright} elevation='0'>
                            Copyright © 2020 Dalat Neo Tech - All Rights
                            Reserved.
                            <img src={IMAGES.PAYMENT} alt='Logo' />
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </MyBox>
    );
};

export default Footer;
