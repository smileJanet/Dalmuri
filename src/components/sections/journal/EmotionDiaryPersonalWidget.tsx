import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import ComfortComp from 'components/sections/journal/comfortComp.tsx'

const EmotionalDiaryPersonalWidget = () => {
  return (
    <Paper
      sx={{height: 400}}
    >
      <Stack>
        <div>Emotion Diary Personal Widget</div>
      </Stack>
      <ComfortComp />
      <div>
        오늘은 위로가 필요한 날이에요
      </div>
    </Paper>
  )

}

export default EmotionalDiaryPersonalWidget