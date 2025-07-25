import { Message } from 'pages/common'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props{
  message:Message
  isMine:boolean
}

const MessageBubble = ({message, isMine}:Props) => {
  const theme = useTheme()

  // useEffect(() => {
  //   console.log("src={message.file[0]} : ", message.file?.[0])
  // })

  /*
  * message.files?.[0] : http://localhost:3001/upload/파일명.jpg로 뜰 것이다.
  * back단에서 "registry.addResourceHandler()" 작성시 나오는 경로와 **일치해야 한다!**
  * */

  return(
    <Box
      sx = {{
        display:'flex',
        flexDirection: 'column',
        alignItems: isMine ? 'flex-end' : 'flex-start',
      }}
    >
    {/* 말풍선 */}
      <Box
        sx = {{
          bgcolor: isMine ? theme.palette.primary.dark : theme.palette.grey[300],
          color: isMine ? 'white' : 'black',
          p: message.file && message.file.length > 0 ? 0.5 : '8px 16px',
          borderRadius: isMine ? '16px 16px 0px 16px' : '16px 16px 16px 0px',
          maxWidth: '75%;',
          wordBreak: 'break-word',
        }}
      >
        {
          message.file && message.file.length > 0 ? (
            <img
              src={message.file[0]}
              alt="채팅 이미지"
              style={{
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                borderRadius:'14px',
            }}
            />
          ) : (
            <Typography
              variant="body2"
              sx = {{
                fontSize:{
                  xs: '0.9rem',
                  sm: '1rem',
                  md: '1.05rem',
                  lg: '1.1rem',
                  xl: '1.15rem',
                }
              }}
            >
              {message.text}
            </Typography>
          )
        }
      </Box>

    {/* 타임스탬프 */}
      <Typography
        variant = "caption"
        sx = {{
          color:'gray',
          mt: 0.5,
          fontSize:'0.75rem',
        }}
      >
        {
          new Date(message.timestamp).toLocaleString('ko-KR', {
            hour: '2-digit',
            minute:'2-digit',
          })
        }
      </Typography>
    </Box>
  )
}

export default MessageBubble