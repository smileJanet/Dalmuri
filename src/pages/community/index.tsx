import './community.css';

const Community = () => {
  return(
    <>
      <div>
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
        </div>
      </div>
    </>
  )
}

export default Community;