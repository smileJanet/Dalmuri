import Grid from '@mui/material/Grid'
import EmotionDiaryWidget from 'components/sections/community/EmotionDiaryWidget.tsx'
import TodaysWordWidget from 'components/sections/community/TodaysWordWidget.tsx'
import AnonymousLetter from 'components/sections/community/AnonymousLetter.tsx'

const Community = () => {
  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={6} xl={8}>
        <TodaysWordWidget />
      </Grid>
      <Grid item xs={6} xl={4}>
        <AnonymousLetter />
      </Grid>

      <Grid item xs={12} xl={8}>
        <EmotionDiaryWidget />
      </Grid>

    </Grid>
  )
}

export default Community