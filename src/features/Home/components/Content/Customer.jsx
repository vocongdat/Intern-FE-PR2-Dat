import { Avatar, Container, Grid, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { IMAGES } from 'constants/index.js';
import { v4 as uuid } from 'uuid';
import Title from '../Title/Title';

const Customer = () => {
    const clientInfo = [
        {
            review: "I'm absolutely thrilled with the beautiful produce. What a treat to find your box at our door. It means the world to my kids and me. Thank you so much for the delicious fruits and veggies!",
            avatar: 'https://images.generated.photos/dS2CnibEnp8MUu3NXuNTwQlrY8MvGY1ZWPtLYMV818U/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyODU2NTAuanBn.jpg',
            firstName: 'LESLIE',
            tagline: 'Accountant, USA',
            id: uuid(),
        },
        {
            review: "I've been receiving a box from you guys for roughly one year now, and absolutely love it. I could not be happier with the fresh produce I receive. Thanks so much for all you do!",
            avatar: 'https://images.generated.photos/rWysQ3TFbMDfmonEbcN4AZDI2uPAjnW01ftD47HcuLQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyOTI5NTMuanBn.jpg',
            firstName: 'ANDRE',
            tagline: 'Teacher, USA',
            id: uuid(),
        },
        {
            review: 'Since we have started receiving your produce my children are eating lots more carrots. It is because your carrots taste so much better than the kind we were getting in the grocery store.',
            avatar: 'https://images.generated.photos/vTmFrFnTjh2LN3YFS7ujL97MQaKM9d4bf70lhkTLdP4/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTMzMDguanBn.jpg',
            firstName: 'KENNE',
            tagline: 'Manager, USA',
            id: uuid(),
        },
    ];

    return (
        <Paper
            elevation={0}
            square
            sx={{
                background: `url(${IMAGES.GREEN_BG}) center center/cover`,
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Container maxWidth='lg'>
                <Grid item xs={12} textAlign='center'>
                    <Title subHeader=' We love our clients' />
                </Grid>
                <Grid container spacing={5}>
                    {clientInfo.map((user) => (
                        <Grid item xs={4} key={user.id}>
                            <Paper
                                sx={{
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    mb: 2,
                                    borderRadius: 2,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        bottom: '-32px',
                                        left: 52,
                                        width: 24,
                                        height: 40,
                                        bgcolor: 'background.paper',
                                        transform:
                                            'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                }}
                            >
                                <Typography
                                    variant='subtitle1'
                                    component='p'
                                    sx={{
                                        width: 350,
                                        fontSize: 18,
                                        p: 4.5,
                                        textAlign: 'justify',
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            left: 8,
                                            top: 30,
                                            width: 20,
                                            height: 20,
                                            position: 'absolute',
                                            backgroundImage:
                                                'url(https://vietponics.vn/wp-content/themes/tm-organik/assets/images/testi_quote_2.png)',
                                        },
                                    }}
                                >
                                    {user.review}
                                </Typography>
                            </Paper>
                            <Grid
                                container
                                direction='row'
                                justifyContent='flex-start'
                                alignItems='center'
                            >
                                <Grid item xs={1} />
                                <Grid item xs={3}>
                                    <Avatar
                                        alt={user.firstName}
                                        srcSet={user.avatar}
                                        sx={{ width: 64, height: 64 }}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <List>
                                        <ListItem
                                            disablePadding
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                textAlign: 'start',
                                                alignItems: 'flex-start',
                                                color: 'common.white',
                                            }}
                                        >
                                            <ListItemText
                                                primary={user.firstName}
                                                sx={{
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                            <ListItemText
                                                primary={user.tagline}
                                                sx={{
                                                    color: 'grey.400',
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Paper>
    );
};

export default Customer;
