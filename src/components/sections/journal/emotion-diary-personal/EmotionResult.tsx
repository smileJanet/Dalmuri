import { useLocation } from 'react-router-dom'
import style from '../../../../style/journal/emotionres.module.css'
import EmotionFlower from 'components/sections/journal/emotion-diary-personal/EmotionFlower.tsx'

const EmotionResult = () => {
  const location = useLocation()
  const { score, color, text } = location.state

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
      </div>
  )
}

export default EmotionResult