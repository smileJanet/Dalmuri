import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import style from '../../../../style/community/atmosphere.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const EmotionDiaryPublicWidget = () => {
  const navigate = useNavigate()

  const [data] = useState<boolean>(true)

  const goToDiaryPublic = () => {
    navigate('/pages/community/emotion-diary-public/SubEdiary')
  }
  
  /*
  * 같은 감정 명 수의 기준 : 현재로부터 지난 1달간 나와 비슷한 감정을 가진 사람들
  * */

  return (
    <Paper
      sx={{height: 400}}
      onClick={goToDiaryPublic}
    >
      <div>감정 일기(소통)</div>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        {
          !data
            ? (
            <div className={style['atmos-widget']}>
              <div className={style['floating-particles']}>
                <div className={style['particle']}></div>
                <div className={style['particle']}></div>
                <div className={style['particle']}></div>
                <div className={style['particle']}></div>
                <div className={style['particle']}></div>
              </div>

              <div className={style['text-content']}>
                세상 어딘가에서, 같은 하늘 아래 <br/>
                비슷한 마음을 가진 이들이 있어요.
              </div>

              <div className={style['breeze-line']}></div>
            </div>
          )
            : (
              <div className={style['atmos-data-widget']}>
                <div className={style['petal-container']}>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                  <div className={style['petal']}></div>
                </div>

                <div className={style['atmos-data-content']}>
                  오늘 당신과 같은 감정을 느끼는 사람이 3명 있어요.
                </div>

                <div className={style['soft-glow-line']}></div>
              </div>
            )
        }
      </Stack>
    </Paper>
  )
}

export default EmotionDiaryPublicWidget
