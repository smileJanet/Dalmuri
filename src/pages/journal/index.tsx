import Grid from '@mui/material/Grid'
import EmotionalDiaryPersonalWidget from 'components/sections/journal/EmotionDiaryPersonalWidget.tsx'
import MinigameWidget from 'components/sections/journal/MinigameWidget.tsx'

const Journal = () => {
  return(
    <Grid container spacing={{xs: 2.5, sm: 3, lg: 3.75}}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={4}
      >
        <EmotionalDiaryPersonalWidget />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={8}
      >
        <MinigameWidget />
      </Grid>
    </Grid>
  )
}

export default Journal;