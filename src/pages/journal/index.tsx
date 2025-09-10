import Grid from '@mui/material/Grid'
import EmotionalDiaryPersonalWidget from 'components/sections/journal/EmotionDiaryPersonalWidget.tsx'

const Journal = () => {
  return(
    <Grid container spacing={{xs: 2.5, sm: 3, lg: 3.75}}>
      <Grid item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={8}>
        <EmotionalDiaryPersonalWidget />
      </Grid>
    </Grid>
  )
}

export default Journal;