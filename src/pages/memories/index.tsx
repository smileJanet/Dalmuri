import Grid from '@mui/material/Grid'
import TimecapsuleWidget from 'components/sections/memories/TimecapsuleWidget.tsx'

const Memories = () => {
  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={4}>
        <TimecapsuleWidget />
      </Grid>
      <Grid item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={8}>
        <TimecapsuleWidget />
      </Grid>
    </Grid>
  )
}

export default Memories;