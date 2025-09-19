import '../../../../style/gomoku.css'
import Stack from '@mui/material/Stack'
import GomokuBoard from 'components/sections/journal/mini-game/GomokuBoard.tsx'

const Gomoku = () => {
  return (
    <div id="root">
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <div
          className="gomoku-container"
          style={{ height: '100%', width: '100%' }}
        >
        {/* 흑돌, 백돌 */}

        {/* 보드 */}
          <GomokuBoard />
        </div>
      </Stack>
    </div>
  )
}

export default Gomoku
