import { User, Message } from 'pages/common'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef, useState } from 'react'
import Button from "@mui/material/Button";
import IconifyIcon from 'components/base/IconifyIcon'
import Paper from "@mui/material/Paper";
import MessageBubble from 'components/sections/chat/MessageBubble.tsx'

interface Props{
    friend: User | null
    onBack: () => void
}
/*
*  [WebSocket으로 채팅 구현하기]
*
*   1. useRef로 WebSocket 인스턴스를 저장 : 컴포넌트가 리랜더링 될때마다 새로운 연결의 생성을 방지하기 위해 useRef 사용
*
*   2. useEffect로 생명주기 관리 :
* - 컴포넌트가 mount되거나 friend prop이 변경될 때 새로운 WebSocket 연결을 설정
* - 서버로부터 메시지를 받으면(=onMessage) message상태를 업데이트
* - 컴포넌트가 unmount될 때(useEffect의 cleanup) WebSocket의 연결을 종료(ws.close)해서 메모리 누수 방지
*
*   3. 사용자에게 메시지를 보낼 때 ws.send()호출, 서버로 메시지 전송 + 화면에 메시지 바로 표시
*
* */

const ChatRoom = ({friend, onBack}:Props) => {
  const theme = useTheme()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    if(!friend) return

    ws.current = new WebSocket(`ws://localhost:3001/chat?id=${friend.userId}`) // 실제 서버로 변경할 것

    ws.current.onopen = () => {
      console.log("WebSocket Connected")
    }

    ws.current.onmessage = (event) => {
      const receivedMsg = JSON.parse(event.data)
      setMessages((prev) => [...prev, {...receivedMsg, isMine: false}])
    }

    ws.current.onclose = () => {
      console.log("Websocket Disconnected")
    }

    ws.current.onerror = (error) => {
      console.error("WebSocket Error: ", error)
    }

    // 컴포넌트가 unmounted될 때 or friend가 변경될 때 WebSocket연결을 종료
    return () => {
      ws.current?.close()
    }

  }, [friend])

  const handleSend = () => {
      if(!input.trim() || !ws.current || ws.current.readyState !== WebSocket.OPEN) return
      const newMsg:Message = {
          msgCd:'',
          senderId:friend?.userId || '알 수 없음',
          text:input,
          timestamp: new Date().toISOString(),
          isMine: true,
      }

      // WebSocket을 통해 서버로 메시지를 전송하기
      ws.current.send(JSON.stringify(newMsg))

      setMessages(prev => [...prev, newMsg])
      setInput('')
  }

  return(
      <Paper
          sx={{
              height: {
                  xs: 600,
                  sm: 700,
                  md: 700,
                  lg: 700,
                  xl: 750,
              },
              display:'flex',
              flexDirection:'column',
              overflow: 'hidden',
          }}
      >
          {/* 채팅방 header */}
          <Box
              sx = {{
                  px:2,
                  py:2,
                  borderBottom : '1px solid white',
                  alignItems:'left',
                  display:'flex',
                  flexShrink: 0,
              }}
          >
              <IconifyIcon
                  icon={'mingcute:arrow-left-line'}
                  onClick={onBack}
                  color = {theme.palette.info.main}
                  width={24}
                  height={24}
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                  {friend?.userNm ?? "알 수 없음"}
              </Typography>
          </Box>

          {/* 채팅방 메시지 */}
          <Box
              sx = {{
                  flex:1,
                  overflowY:'auto',
                  px:2,
                  py:1,
                  display:'flex',
                  flexDirection:'column',
                  gap:1,
                  minHeight: 0,
              }}
          >
              {messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} isMine={msg.isMine} />
              ))}
          </Box>

          {/* 채팅방 Input */}
          <Box
              sx = {{
                  px:2,
                  py:1.5,
                  display:'flex',
                  gap:1,
                  borderTop: '1px solid white',
              }}
          >
              <TextField
                  fullWidth
                  size="medium"
                  placeholder="메시지를 입력하세요."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.nativeEvent.isComposing) {
                      e.preventDefault()
                      handleSend()
                      }
                  }}
              />
              <Button
                  variant='contained'
                  onClick={handleSend}
              >
                  전송
              </Button>
          </Box>
      </Paper>

  )

}

export default ChatRoom;