import { SxProps, useTheme } from '@mui/material'
import { useEffect, useMemo } from 'react'
import * as echarts from 'echarts/core';
import { EffectScatterChart, ScatterChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import ReactEchart from 'components/base/ReactEchart.tsx'
import EChartsReactCore from 'echarts-for-react/lib/core'
import { GraphicComponent, TooltipComponent } from 'echarts/components'

echarts.use([ScatterChart, EffectScatterChart, CanvasRenderer, TooltipComponent, GraphicComponent])

interface ScatterChartProps {
  chartRef: React.RefObject<EChartsReactCore>
  sx?: SxProps
  myEmo: {
    score: number,
    magnitude: number,
  },
  data: {
    id: number,
    userId: string,
    userNm: string,
    score: number,
    magnitude: number,
  }[]
}

const EmotionChart = ({ chartRef, data, myEmo, ...rest }:ScatterChartProps) => {
  const theme = useTheme()

  const option = useMemo(
    () => ({
      xAxis: {
        scale: true,
        min: 0,
        max: 100,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        scale: true,
        min: 0,
        max: 100,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 10,
          itemStyle: {
            color: theme.palette.primary.main,
            opacity: 0.6,
          },
          data: data.map((d) => ({
            value: [d.score, d.magnitude],
            score: d.score,
            magnitude: d.magnitude,
          })),
          label: {
            show: false,
          }
        },
        {
          type: 'effectScatter',
          symbolSize: 12,
          itemStyle: {
            color: theme.palette.secondary.light,
            opacity: 0.8,
          },
          data: [
            [myEmo.score, myEmo.magnitude]
          ]
        },
      ],
    }),
    [data, theme],
  )

  useEffect(() => {
    const chartInstance = chartRef.current?.getEchartsInstance()
    if(!chartInstance) return

    const container = chartRef.current?.ele
    if(!container) return

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize()
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [chartRef])

  return (
    <ReactEchart
      ref={chartRef}
      echarts={echarts}
      option={option}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...rest}
    />
  )
}

export default EmotionChart