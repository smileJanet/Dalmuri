import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

const TodaysWordWidget = () => {

  return (
    <Paper sx={{height:400}}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        오늘의 할말
      </Stack>
    </Paper>
  )
}

export default TodaysWordWidget