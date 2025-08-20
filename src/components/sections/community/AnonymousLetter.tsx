import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import '../../../style/anonymousletter.css'

const AnonymousLetter = () => {
  return (
    <Paper sx={{height:400}}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <div className="letter-wrapper">
          {/* Background glow effects */}
          <div className="glow-effect-1"></div>
          <div className="glow-effect-2"></div>

          <div className="letter-container">
            {/* Floating letters */}
            <div className="floating-letters">
              <div className="letter"></div>
              <div className="letter"></div>
              <div className="letter"></div>
            </div>

            {/* Main envelope */}
            <div className="envelope">
              <div className="inner-glow"></div>
            </div>

          </div>

          {/* Loading text */}
          {/*<div className="loading-text">Anonymous Letter</div>*/}
        </div>
      </Stack>
    </Paper>
  )
}

export default AnonymousLetter