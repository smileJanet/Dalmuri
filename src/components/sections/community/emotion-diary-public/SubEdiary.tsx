import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import EmotionAnalysis from 'components/sections/community/emotion-diary-public/EmotionAnalysis.tsx'
import EmotionTrash from 'components/sections/community/emotion-diary-public/EmotionTrash.tsx'

const SubEdiary = () => {

  /**
  * [감정 쌍둥이 7단계의 valence, arousal]
  *
  *     [감정 단계]	     [Valence (0~100)]
      깊은 어둠 (sad)	        0~20
    잿빛 슬픔 (depress)	      20~35
      흐린 마음 (dull)	        35~50
    고요한 평온 (calm)	        50~60
      맑은 미소 (smile)	      60~75
     밝은 설렘 (bright)	      75~90
    눈부신 행복 (happy)	      90~100

  * 일반화에서 arousal은 제외
  *
  * */

  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid
        item
        xs={12}
        lg={8}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
          height: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <EmotionAnalysis />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
          height: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <EmotionTrash />
        </Box>
      </Grid>
    </Grid>
  )
}

export default SubEdiary