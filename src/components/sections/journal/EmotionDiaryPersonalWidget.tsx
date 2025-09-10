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
    </Paper>
  )

}

export default EmotionalDiaryPersonalWidget