import { Grid, Typography } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { Images, IntroImage } from 'constants/index';
import Title from 'features/Home/components/Title/Title';
import React from 'react';

const useStyles = makeStyles({
    imgBorder: {
        '& img': {
            borderRadius: 8,
        },
    },
    border: {
        position: 'absolute',
        height: '100%',
        width: '75%',
        top: '15px',
        left: '114px',
        border: '3px solid #f1eeea',
        borderLeft: 'none',
        marginLeft: '30px',
    },
});

const Introduce = () => {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} textAlign='center'>
                <Title
                    header='Welcome to Vietponics!'
                    subHeader='câu chuyện ngắn, chặn đường dài'
                />
            </Grid>

            <Grid item xs={6}>
                <Paper elevation={0} className={classes.imgBorder}>
                    <img srcSet={Images.INTRODUCE} alt='Giới thiệu farm' loading='lazy' />
                </Paper>
            </Grid>

            <Grid item xs={6}>
                <Paper elevation={0} sx={{ ml: 3, position: 'relative' }}>
                    <Typography variant='h5' component='h2' gutterBottom>
                        VIETPONICS
                    </Typography>

                    <div className={classes.border} />

                    <Typography variant='body1' component='p' gutterBottom>
                        Được thành lập từ 2014, Vietponics là một trong những đơn vị tiên phong áp
                        dụng công nghệ nông nghiệp thông nghiệp vào sản xuất. Hệ thống máy tính sẽ
                        tự động tính toán liều lượng phân bón và chế độ tưới phù hợp cho từng loại
                        cây. Quy trình sản xuất được lập trình và kiểm soát trên máy tính từ khi
                        trồng đến khi thu hoạch, nhờ đó các sản phẩm đều có thể truy xuất nguồn gốc
                        một cách dễ dàng. Với tiêu chí người sản xuất Việt có trách nhiệm với người
                        tiêu dùng Việt, chúng tôi sẽ mang đến cho khách hàng những sản phẩm chất
                        lượng thuần khiết vượt trội do chính nông dân Việt sản xuất.
                    </Typography>

                    <ImageList sx={{ width: '100%', height: 370, mt: 4 }} cols={3} rowHeight={164}>
                        {IntroImage.map((image) => (
                            <ImageListItem key={image.id} className={classes.imgBorder}>
                                <img srcSet={image.imageUrl} alt={image.title} loading='lazy' />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Paper>
            </Grid>
        </>
    );
};

export default React.memo(Introduce);
