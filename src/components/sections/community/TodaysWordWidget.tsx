import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { fontFamily } from 'theme/typography.ts'

const TodaysWordWidget = () => {

  return (
    <Paper sx={{height:400}}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <Typography
          variant="h5"
          fontWeight={500}
          fontFamily={fontFamily.third}
        >
          "지금 가장 보고싶은 사람의 이름은?"
        </Typography>
      </Stack>
    </Paper>
  )
}

export default TodaysWordWidget