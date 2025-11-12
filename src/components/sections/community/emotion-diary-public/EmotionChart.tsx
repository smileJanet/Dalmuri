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

  // valence
  const getEmotionColor = (score: number, magnitude: number) => {
    let base = '#CCCCCC'

    if (score >= 0 && score <= 20) base = '#4B3F72'         // 깊은 어둠
    else if (score >= 21 && score <= 35) base = '#517EA6'   // 잿빛 슬픔
    else if (score >= 36 && score <= 50) base = '#7BAACD'   // 흐린 마음
    else if (score >= 51 && score <= 60) base = '#A9D6C8'   // 고요한 평온
    else if (score >= 61 && score <= 75) base = '#F3E99F'   // 맑은 미소
    else if (score >= 76 && score <= 90) base = '#FF9E80'   // 밝은 설렘
    else if (score >= 91 && score <= 100) base = '#F9A1A0'  // 눈부신 행복

    return adjustSaturation(base, magnitude)
  }

  // arousal
  const adjustSaturation = (hexColor: string, magnitude: number) => {
    // HEX → HSL 변환
    const r = parseInt(hexColor.slice(1, 3), 16) / 255
    const g = parseInt(hexColor.slice(3, 5), 16) / 255
    const b = parseInt(hexColor.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    // magnitude를 0~100 → 40~100% 사이 채도로 맵핑
    const adjustedS = Math.min(1, Math.max(0.4, magnitude / 100));
    const adjustedSPercent = (s * adjustedS * 100).toFixed(1);
    const adjustedLPercent = (l * 100).toFixed(1);

    return `hsl(${(h * 360).toFixed(1)}, ${adjustedSPercent}%, ${adjustedLPercent}%)`;
  }

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
        left: 50,
        right: 50,
        top: 30,
        bottom: 10,
      },
      series: [
        {
          type: 'scatter',
          symbolSize: 10,
          itemStyle: {
            opacity: 0.8,
          },
          data: data.map((d) => ({
            value: [d.score, d.magnitude],
            itemStyle: {
              color: getEmotionColor(d.score, d.magnitude),
              shadowBlur: 12,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
            score: d.score,
            magnitude: d.magnitude,
          })),
          label: {
            show: false,
          }
        },
        {
          type: 'effectScatter',
          symbolSize: 16,
          itemStyle: {
            color: theme.palette.secondary.light,
            shadowBlur: 20,
            shadowColor: theme.palette.secondary.main,
          },
          rippleEffect: {
            scale: 2.5,
            brushType: 'fill',
            period: 8,
          },
          data: [[myEmo.score, myEmo.magnitude]],
          zlevel: 2,
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