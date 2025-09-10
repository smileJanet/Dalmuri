import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import '../../../style/timecapsule.css'

const TimecapsuleWidget = () => {
  return(
    <Paper sx={{height: 400}}>
      <div>타임 캡슐</div>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <div className="timecapsule-container">
          <div className="time-loader">
            <div className="clock-hand"></div>
            <div className="clock-hand"></div>

            <div className="center-dot"></div>

            <span></span>
            <span></span>
            <span></span>

            <div className="time-markers">
              <div className="marker"></div>
              <div className="marker"></div>
              <div className="marker"></div>
              <div className="marker"></div>
            </div>
          </div>

          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <div className="loading-text">Time Capsule</div>
          <div> 다음 캡슐 오픈까지 : 00시간 00분 00초 남아따!</div>
        </div>
      </Stack>
    </Paper>
  )
}

export default TimecapsuleWidget