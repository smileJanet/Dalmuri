import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import EmotionChart from 'components/sections/community/emotion-diary-public/EmotionChart.tsx'
import { useEffect, useRef, useState } from 'react'
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

  const myEmotion = {score: 60, magnitude: 28}
  const chartRef = useRef<EChartsReactCore>(null)
  const [res, setRes] = useState('')

  /* TEMP_EMO_DATA의 기준 : 오늘 날짜로부터 등록된 최신순 10개*/
  const TEMP_EMO_DATA = [
    {
      id: 1,
      userId: 'user01',
      userNm: '김인경',
      score: 60,
      magnitude: 40,
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

  const messages = [
    {
      emotion: 'sad',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님 입니다.\n
          오늘은 000님처럼, 마음 한켠의 어둠을 인정하고 조용히 자신을 다독여보세요.\n\n
          감정을 닮았다는건, 서로의 고요한 외로움을 이해한다는 뜻이에요.\n
          말로 하지 않아도 통하는 그 무게 속에서,\n 우리는 서로의 존재로 위로가 됩니다.\n\n
          슬픔은 결코 약함이 아니라, 세상을 깊이 느끼는 능력이에요.\n
          오늘 하루는 자신에게 조금 더 부드럽게 대해주세요.\n
          그 따뜻한 시선이 당신과 000님의 마음을 서서히 밝히며, 다시 빛을 향해 걸어가게 할 거예요.\n
      `
    },
    {
      emotion: 'depress',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다.\n
          오늘은 000님처럼, 잠시 세상의 속도를 늦추고 마음의 안개를 천천히 거둬보세요.\n\n
          감정이 닮았다는 건, 서로의 상처를 헤아릴 줄 안다는 뜻이에요.\n
          서로의 무거운 마음을 비추는 그 시선 속에, 작은 온기가 자라납니다.\n\n
          완전히 괜찮지 않아도 괜찮아요.\n
          당신이 여전히 느끼고, 고민하고, 하루를 살아가고 있다는 사실이 이미 빛이에요.\n
          그 빛이 오늘은 조금 희미하더라도, 내일은 당신과 000님의 마음을 다시 데워줄 거예요.\n
      `
    },
    {
      emotion: 'dull',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다.\n
          오늘은 000님과 함께, 무기력한 하루 속에서도 작게 빛나는 의미를 찾아보세요.\n\n
          감정이 닮았다는 건, 서로의 공허함을 이해한다는 뜻이에요.\n
          그 속에서도 마음의 작은 파동이 전해질 때, 우리는 조금씩 다시 살아납니다.\n\n
          완벽한 하루가 아니어도 괜찮아요.\n
          당신의 한숨과 미소, 그 모두가 삶의 일부니까요.\n\
          오늘은 그 무표정한 시간 속에서도, 당신과 000님의 마음에 작지만 따스한 색이 번지길 바랍니다.\n
      `
    },
    {
      emotion: 'calm',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님 입니다.\n
          오늘은 000님과 따뜻한 교류를 나누며 서로의 마음에 귀 기울여보세요.\n\n
          감정이 닮았다는 건, 마음의 결이 닿아 있다는 뜻이에요.\n
          서로 다른 하루를 살아가지만, 같은 감정을 공유한다는 건 보이지 않는 다리를 놓는 것과 같아요.\n\n
          그 만남 속에서 서로의 마음을 조금 더 이해하고, 작은 위로를 주고받을 수 있습니다.\n
          오늘 하루 당신의 마음이 조금 더 부드럽고 따스하게 흐르길 바라며,\n
          그 따스함이 주변 사람들에게도 스며들어 당신과 000님의 하루를 함께 밝히길 바랍니다.\n
      `
    },
    {
      emotion: 'smile',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다.\n
          오늘은 000님과 함께, 마음의 잔잔한 행복을 나누어보세요.\n\n
          감정이 닮았다는 건, 같은 빛깔의 미소를 짓는다는 뜻이에요.\n
          소소한 일상 속 웃음이 서로를 닮게 만들고, 따뜻한 마음이 하루를 물들입니다.\n\n
          당신의 부드러운 미소는 누군가에게 햇살이 됩니다.\n
          오늘은 그 빛이 000님에게 닿아, 두 사람의 하루를 조금 더 환하게 밝혀주길 바랍니다.\n
      `
    },
    {
      emotion: 'bright',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다.\n
          오늘은 000님과 함께, 설렘이 가득한 하루를 만들어보세요.\n\n
          감정이 닮았다는 건, 같은 방향을 바라보고 있다는 뜻이에요.\n
          두 마음이 닮은 파동으로 공명하며, 세상을 조금 더 반짝이게 합니다.\n\n
          작은 기대가 커다란 기쁨으로 자라나듯,\n
          당신의 마음도 오늘 하루 더욱 생기 있게 피어나길 바랍니다.\n
          그 활기가 000님에게도 전해져, 함께 웃음이 번지기를 바랍니다.\n
      `
    },
    {
      emotion: 'happy',
      msg: `
          당신과 가장 가까운 감정을 느끼는 감정 쌍둥이는 000님입니다.\n
          오늘은 000님과 함께, 서로의 기쁨을 나누며 환한 하루를 보내세요.\n\n
          감정이 닮았다는 건, 같은 행복의 파장을 나눈다는 뜻이에요.\n
          두 사람의 밝은 에너지가 만나면, 세상은 조금 더 따스해집니다.\n\n
          당신의 웃음은 주변 사람들에게 빛이 되고,\n
          그 빛은 다시 당신에게 돌아옵니다.\n
          오늘 하루, 당신과 000님의 마음이 가장 눈부신 햇살로 서로를 비추길 바랍니다.\n
      `
    }
  ]

  function setMessage(myEmotion: {score: number, magnitude: number}) {
    const valence = myEmotion.score
    // const arousal = myEmotion.magnitude

    let resMsg = ''

    const emoRange = [
      { emotion:'sad', min: 0, max: 20 },
      { emotion:'depress', min: 21, max: 35 },
      { emotion:'dull', min: 36, max: 50 },
      { emotion:'calm', min: 51, max: 60 },
      { emotion:'smile', min: 61, max: 75 },
      { emotion:'bright', min: 76, max: 90 },
      { emotion:'happy', min: 91, max: 100 },
    ]

    emoRange.some((r) => {
      if (valence >= r.min && valence <= r.max) {
        const msgObj = messages.find((m) => m.emotion === r.emotion)
        if (msgObj) resMsg = msgObj.msg
        return true
      }
      return false
    })

    return resMsg
  }

  useEffect(() => {
    const newMsg = setMessage(myEmotion)
    setRes(newMsg)
  }, [myEmotion])

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
              xs: 100,
              sm: 200,
              md: 300,
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
          lineHeight :{
            xs: '1.2rem',
            md: '1.0rem',
            lg: '1.05rem'
          },
        }}>
          <div style={{ whiteSpace: 'pre-line'}}>
            {res}
          </div>
        </Box>
      </Stack>
    </Paper>
  )
}

export default EmotionAnalysis