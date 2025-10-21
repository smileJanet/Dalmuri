import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import style from '../../../style/journal/emotion.module.css'
import { useNavigate } from 'react-router-dom'

const EmotionalDiaryPersonalWidget = () => {
  const navigate = useNavigate()

  const goToDiary = () => {
    navigate('/pages/journal/emotion-diary-personal/MainEdiary')
  }

  return (
    <Paper
      sx={{height: 400}}
      onClick={goToDiary}
    >
      <div>감정 일기(기록)</div>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <div className={style['emotion-widget']}>
          <div className={style['emotion-face']}>🤗</div>
          <div className={`${style['emotion-glow']} ${style['glow1']}`}></div>
          <div className={`${style['emotion-glow']} ${style['glow2']}`}></div>
          <div className={`${style['emotion-glow']} ${style['glow3']}`}></div>
          <div className={style['emotion-text']}>
            오늘은 위로가 필요한 날이에요
          </div>
        </div>
      </Stack>
    </Paper>
  )

}

export default EmotionalDiaryPersonalWidget