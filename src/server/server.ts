import { WebSocketServer } from 'ws'
import type { WebSocket } from 'ws'
import { IncomingMessage } from 'node:http'

const PORT = process.env.PORT || 3001

const wss = new WebSocketServer({ port: Number(PORT) })

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const url = new URL(req.url || '', `http://#{req.headers.host}`)
  const userId = url.searchParams.get('userId') || '알 수 없음'

  console.log(`[연결됨] 유저 ID : ${userId}`)

  ws.send(`안녕, ${userId}님! 연결 성공!`)

  ws.on('message', (message:string) => {
    console.log(`[수신됨] ${userId} : ${message}`)

    wss.clients.forEach(client => {
      if(client.readyState === ws.OPEN) {
        client.send(`[${userId}]  ${message}`)
      }
    })
  })

  ws.on('close', () => {
    console.log(`[연결 종료] ${userId}`)
  })

})