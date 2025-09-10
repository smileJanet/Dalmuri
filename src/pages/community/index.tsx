import Grid from '@mui/material/Grid'
import EmotionDiaryPublicWidget from 'components/sections/community/EmotionDiaryPublicWidget.tsx'
import TodaysWordWidget from 'components/sections/community/TodaysWordWidget.tsx'
import AnonymousLetterWidget from 'components/sections/community/AnonymousLetterWidget.tsx'
import Box from '@mui/material/Box'
import ChallengeWidget from 'components/sections/community/ChallengeWidget.tsx'

const Community = () => {
  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid
        item
        xs={12}
        sm={6}
        xl={8}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
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
        }}>
          <TodaysWordWidget />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        xl={4}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
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
        }}>
          <AnonymousLetterWidget />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={8}
        xl={8}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
          height: { xl: 300 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <EmotionDiaryPublicWidget />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        sx={{ display: 'flex' }}
      >
        <Box sx={{
          height: { xl: 300 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ChallengeWidget />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Community