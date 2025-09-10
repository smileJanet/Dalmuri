import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useMediaQuery, useTheme } from '@mui/material'
import '../../../style/anonymousletter.css'

const AnonymousLetterWidget = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  const getGap = () => {
    if (isMobile) return 1
    if (isTablet) return 1
    return 0.2
  }

  const getPadding = () => {
    if (isMobile) return '10px'
    if (isTablet) return '12px'
    return '15px'
  }

  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
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
        {/* 편지/봉투와 텍스트를 같은 레벨로 분리 */}
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