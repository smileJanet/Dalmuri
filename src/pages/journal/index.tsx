import Grid from '@mui/material/Grid'
import EmotionalDiaryPersonalWidget from 'components/sections/journal/EmotionDiaryPersonalWidget.tsx'
import Box from '@mui/material/Box'

const Journal = () => {
  return(
    <Grid container spacing={{xs: 2.5, sm: 3, lg: 3.75}}>
      <Grid
        item
        xs={12}
        sm={6}
        xl={4}
        sx={{ display: 'flex' }}
      >
        <Box
          sx={{
           height: {
             xs: 'auto',
             sm: 230,
             md: 230,
             lg: 250,
             xl: 250,
           },
           width: '100%',
           display: 'flex',
           flexDirection: 'column'
          }}
        >
          <EmotionalDiaryPersonalWidget />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Journal;