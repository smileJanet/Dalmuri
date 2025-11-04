import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import style from '../../../style/community/atmosphere.module.css'

const EmotionDiaryPublicWidget = () => {
  return (
    <Paper
      sx={{height: 400}}
    >
      <div>감정 일기(소통)</div>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
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
      </Stack>
    </Paper>
  )
}

export default EmotionDiaryPublicWidget
