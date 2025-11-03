import { useLocation, useNavigate } from 'react-router-dom'
import style from '../../../../style/journal/emotionres.module.css'
import EmotionFlower from 'components/sections/journal/emotion-diary-personal/EmotionFlower.tsx'
import Button from '@mui/material/Button'
import IconifyIcon from 'components/base/IconifyIcon.tsx'

const EmotionResult = () => {
  const location = useLocation()
  const { score, color, text } = location.state
  const navigate = useNavigate()

  const gotoJournal = () => {
    navigate('/pages/journal')
  }

  return (
      <div className={style['emotion-res-container']}>
        <div
          className={style['emotion-res-images']}
        >
          <EmotionFlower
            score={score}
            color={color}
          />
        </div>
        <div className={style['emotion-res-text']}>
          <div className={style['emotion-res-score']}>
            오늘의 감정 점수: {score}점
          </div>
          <div className={style['emotion-res-cmnt']}>
            {text}
          </div>
        </div>
        <Button
          variant="contained"
          size="large"
          startIcon={<IconifyIcon icon="mingcute:download-line"/>}
          onClick={gotoJournal}
          sx={{
            background: 'linear-gradient(to bottom, #f2f6ff, #d1dbff)',
            border: '1.5px solid #8fa8e0',
            color: '#1e2a78',
            borderRadius: '8px',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.8)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(to bottom, #e2e8ff, #bcc9ff)',
            },
          }}
        >
          저장하기
        </Button>
      </div>
  )
}

export default EmotionResult