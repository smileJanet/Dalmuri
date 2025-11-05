import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import EmotionChart from 'components/sections/community/emotion-diary-public/EmotionChart.tsx'
import { useRef } from 'react'
import EChartsReactCore from 'echarts-for-react/lib/core'
import Box from '@mui/material/Box'

/**
 * [감정 쌍둥이 7단계의 valence, arousal]
 *
 *     [감정 단계]	     [Valence (0~100)]
 깊은 어둠 (sad)	         0~20
 잿빛 슬픔 (depress)	     20~35
 흐린 마음 (dull)	       35~50
 고요한 평온 (calm)	     50~60
 맑은 미소 (smile)	       60~75
 밝은 설렘 (bright)	     75~90
 눈부신 행복 (happy)	     90~100

 * 일반화에서 arousal은 제외
 *
 * 나의 가장 최근 감정을 기준으로, 감정 거리가 가장 가까운 사람을 색출
 * */

/*
* [KNN 알고리즘]
* 데이터로부터 거리가 가까운 n개의 이웃 데이터를 분류 혹은 회귀하는 지도 머신러닝 알고리즘
* x축 : valence = score
* y축 : arousal = magnitude
*
* 공식
* distance = Math.sqrt((myScore - otherScore) ** 2 + (myMagnitude - otherMagnitude) ** 2)
*
* */

const EmotionAnalysis = () => {

  const myEmotion =  {score: 60, magnitude: 28}
  const chartRef = useRef<EChartsReactCore>(null)

  /* TEMP_EMO_DATA의 기준 : 오늘 날짜로부터 등록된 최신순 10개*/
  const TEMP_EMO_DATA = [
    {
      id: 1,
      userId: 'user01',
      userNm: '김인경',
      score: 60,
      magnitude: 28,
    },
    {
      id: 2,
      userId: 'user02',
      userNm: '박부구',
      score: 30,
      magnitude: 76,
    },
    {
      id: 3,
      userId: 'user03',
      userNm: '최주영',
      score: 50,
      magnitude: 44,
    },
    {
      id: 4,
      userId: 'user01',
      userNm: '김인경',
      score: 60,
      magnitude: 28,
    },
    {
      id: 5,
      userId: 'user02',
      userNm: '박부구',
      score: 10,
      magnitude: 20,
    },
    {
      id: 6,
      userId: 'user03',
      userNm: '최주영',
      score: 50,
      magnitude: 16,
    },
    {
      id: 7,
      userId: 'user01',
      userNm: '김인경',
      score: 50,
      magnitude: 12,
    },
    {
      id: 8,
      userId: 'user02',
      userNm: '박부구',
      score: 70,
      magnitude: 56,
    },
    {
      id: 9,
      userId: 'user03',
      userNm: '최주영',
      score: 60,
      magnitude: 38,
    },
    {
      id: 10,
      userId: 'user01',
      userNm: '김인경',
      score: 80,
      magnitude: 20,
    },
  ]

  return (
    <Paper
      sx={{
        width: '100%',
        height: 'auto',
    }}>
      <div>감정 분석</div>
      <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',

        }}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
      }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: 200,
              sm: 300,
              md: 400,
            },
          }}>
          <EmotionChart
            chartRef={chartRef}
            data={TEMP_EMO_DATA}
            myEmo={myEmotion}
          />
        </Box>
        <Box sx={{
          width: '100%',
          height: 300,
          overflowY: 'auto',
          boxSizing: 'border-box',
          p: 2,
        }}>
          <div>
            당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다. <br />
            오늘은 000님과 따뜻한 교류를 나누며 서로의 마음에 귀 기울여보세요. <br /><br />

            감정이 닮았다는 건, 마음의 결이 닿아 있다는 뜻이에요.<br />
            서로 다른 하루를 살아가지만, 같은 감정을 공유한다는 건 보이지 않는 다리를 놓는 것과 같아요. <br /><br />

            그 만남 속에서 서로의 마음을 조금 더 이해하고,<br /> 작은 위로를 주고받을 수 있습니다.<br />
            오늘 하루 당신의 마음이 조금 더 부드럽고 따스하게 흐르길 바라며,<br />
            그 따스함이 주변 사람들에게도 스며들어 당신과 000님의 하루를 함께 밝히길 바랍니다.<br />
          </div>
        </Box>
      </Stack>
    </Paper>
  )
}

export default EmotionAnalysis