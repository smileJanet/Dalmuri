import { SxProps, useTheme } from '@mui/material';
import { fontFamily } from 'theme/typography';
import { useMemo } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { PolarComponent, TooltipComponent, GraphicComponent } from 'echarts/components';
import ReactEchart from 'components/base/ReactEchart';
import EChartsReactCore from 'echarts-for-react/lib/core';

echarts.use([PolarComponent, TooltipComponent, GraphicComponent, BarChart, CanvasRenderer]);

interface PolarBarChartProps {
  chartRef: React.RefObject<EChartsReactCore>;
  sx?: SxProps;
}

const VisitorsChart = ({ chartRef, ...rest }: PolarBarChartProps) => {
  const theme = useTheme();

  const option = useMemo(
    () => ({
      polar: {
        radius: [80, '75%'],
      },
      angleAxis: {
        max: 100,
        startAngle: 180,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      radiusAxis: {
        show: false,
        type: 'category',
        data: ['Direct', 'Social', 'Organic'],
      },
      tooltip: {},
      series: [
        {
          type: 'bar',
          data: [
            {
              type: 'Direct',
              value: 50,
              itemStyle: {
                color: '#1589e5',
              },
            },
            {
              type: 'Social',
              value: 60,
              itemStyle: {
                color: '#60E2EE',
              },
            },
            {
              type: 'Organic',
              value: 80,
              itemStyle: {
                color: '#7f4fc4',
              },
            },
          ],
          coordinateSystem: 'polar',
          barCategoryGap: '35%',
          label: {
            show: false,
          },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '150k',
            fill: theme.palette.text.primary,
            fontSize: theme.typography.h3.fontSize,
            fontFamily: fontFamily.sub,
            fontWeight: 500,
            letterSpacing: 1,
          },
        },
      ],
    }),
    [theme],
  );

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default VisitorsChart;
