import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const generateOptions = (data) => {
    const categories = data.map((item) => item.name);
    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Doanh thu',
        },
        xAxis: {
            categories,
            crosshair: true,
        },
        colors: ['#F3585B', '#5fbd74'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Đã bán được',
                data: data.map((item) => item.sold),
            },
            {
                name: 'Đã xem',
                data: data.map((item) => item.viewed),
            },
        ],
    };
};

const LineChart = ({ data }) => {
    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions(generateOptions(data));
    }, [data]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};
LineChart.propTypes = {
    data: PropTypes.array,
};

LineChart.defaultProps = {
    data: [],
};

export default React.memo(LineChart);
