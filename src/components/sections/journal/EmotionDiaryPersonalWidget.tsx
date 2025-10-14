import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import '../../../style/emotion.css'
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
        <div className="emotion-widget">
          <div className="emotion-face">🤗</div>
          <div className="emotion-glow glow1"></div>
          <div className="emotion-glow glow2"></div>
          <div className="emotion-glow glow3"></div>
          <div className="emotion-text">
            오늘은 위로가 필요한 날이에요
          </div>
        </div>
      </Stack>
    </Paper>
  )

}

export default EmotionalDiaryPersonalWidget