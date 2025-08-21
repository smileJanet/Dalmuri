import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useMediaQuery, useTheme } from '@mui/material'
import '../../../style/anonymousletter.css'

const AnonymousLetterWidget = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  const getPaperHeight = () => {
    if (isMobile) return 'clamp(300px, 50vh, 400px)'
    if (isTablet) return 'clamp(350px, 45vh, 400px)'
    return 400
  }

  const getGap = () => {
    if (isMobile) return 1
    if (isTablet) return 1.5
    return 2
  }

  const getPadding = () => {
    if (isMobile) return '10px'
    if (isTablet) return '12px'
    return '15px'
  }

  return (
    <Paper
      sx={{
        height: getPaperHeight(),
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: '100%',
          gap: getGap(),
          flexDirection: 'column',
          padding: getPadding(),
          position: 'relative',
        }}
      >
        <div className="letter-wrapper">
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
              <div className="flap"></div>
              <div className="body"></div>
              <div className="inner-glow"></div>
            </div>
          </div>

          {/* Sparkles */}
          <div className="sparkles">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
          </div>

          <div className="loading-text">
            Anonymous <br /> Letter
          </div>
        </div>

        <div
          style={{
            marginTop: isMobile ? 10 : isTablet ? 15 : 20,
            fontSize: isMobile ? '14px' : isTablet ? '16px' : '16px',
            textAlign: 'center',
            padding: isMobile ? '0 10px' : '0',
          }}
        >
          익명으로 온 편지가 10개 있어요!
        </div>
      </Stack>
    </Paper>
  )
}

export default AnonymousLetterWidget