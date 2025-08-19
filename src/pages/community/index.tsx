import Grid from '@mui/material/Grid'
import EmotionDiaryWidget from 'components/sections/community/EmotionDiaryWidget.tsx'

const Community = () => {
  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12} xl={8}>
        <EmotionDiaryWidget />
      </Grid>

    </Grid>
  )
}

export default Community