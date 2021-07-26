import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { BLOGS_IMAGE } from 'constants/index';
import Title from 'features/Home/components/Title/Title';
import { v4 as uuid } from 'uuid';

const Blogs = () => {
    const blogsInfo = [
        {
            title: '7 LÝ DO NÊN SỬ DỤNG DƯA LEO BABY',
            describe:
                'Dưa leo có nguồn dinh dưỡng nhiều hơn các bạn nghĩ. Dưa leo baby là nguồng cung cấp vitamin C và A. Chúng cũng chứa…',
            date: '28 Tháng Sáu, 2020',
            comment: 0,
            imageUrl: BLOGS_IMAGE.BLOG1,
            id: uuid(),
        },
        {
            title: 'CỦ HỒI CỦ THÌ LÀ 8 ĐIỀU BẠN CẦN BIẾT',
            describe:
                'Củ hồi củ thì là cách gọi của người Đà Lạt nhé.1.Củ hồi, còn gọi là củ phê-nôn, có lẽ là phiên âm tiếng Việt…',
            date: '25 Tháng Sáu, 2020',
            comment: 0,
            imageUrl: BLOGS_IMAGE.BLOG2,
            id: uuid(),
        },
        {
            title: 'RAU HỮU CƠ – CÁC ĐỐI TƯỢNG CẦN ƯU TIÊN SỬ DỤNG',
            describe:
                'Một điều rõ ràng và chắc chắn là rau hữu cơ tốt cho tất cả mọi đối tượng. Nhưng nếu chưa có khả năng sử…',
            date: '8 Tháng Sáu, 2020',
            comment: 0,
            imageUrl: BLOGS_IMAGE.BLOG3,
            id: uuid(),
        },
    ];

    return (
        <>
            <Grid item xs={12}>
                <Title header='Latest' subHeader='FROM OUR BLOG' />
            </Grid>

            {blogsInfo.map((blog) => (
                <Grid
                    key={blog.id}
                    item
                    xs={4}
                    textAlign='justify'
                    sx={{
                        mb: 8,
                        '& .MuiCardMedia-root': {
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        },
                    }}
                >
                    <Card>
                        <CardMedia
                            component='img'
                            alt={blog.title}
                            height='230'
                            image={blog.imageUrl}
                            title={blog.title}
                        />
                        <CardHeader
                            avatar={
                                <IconButton aria-label='date'>
                                    <CalendarTodayIcon />
                                </IconButton>
                            }
                            subheader={blog.date}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant='h6'
                                component='h4'
                            >
                                {blog.title}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {blog.describe}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='medium'>Đọc tiếp</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </>
    );
};

export default Blogs;
