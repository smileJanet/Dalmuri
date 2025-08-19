import Grid from '@mui/material/Grid'
import TimecapsuleWidget from 'components/sections/memories/TimecapsuleWidget.tsx'
import '../../style/memories.css'


const Memories = () => {
  return(
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      <Grid item xs={12} xl={4}>
        <TimecapsuleWidget />
      </Grid>
    </Grid>
  )
}

export default Memories;