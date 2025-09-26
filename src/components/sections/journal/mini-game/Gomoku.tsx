import '../../../../style/gomoku.css'
import Stack from '@mui/material/Stack'
import GomokuBoard from 'components/sections/journal/mini-game/GomokuBoard.tsx'
import { useState } from 'react'

export interface GomokuBoardProps {
  stone: {x: number, y: number, color: 'black' | 'white'}[],
  placeStone: (x: number, y: number) => void,
}

const Gomoku = () => {
  const BOARD_SIZE = 15
  const [stone, setStone] = useState<{x:number, y:number, color: 'black' | 'white'}[]>([])
  const [turn, setTurn] = useState<'black' | 'white'>('white')
  const [win, setWin] = useState<'black' | 'white' | null>(null)

  const handlePlaceStone = (x: number, y:number) => {
    if(turn !== 'white') return

    // 이미 돌이 있는 칸인지 두기
    if(stone.some(s => s.x === x && s.y === y)) return

    // 돌을 칸에 두기
    const newStone = [...stone, {x, y, color: 'white' as const}]
    setStone(newStone)

    // 방금 둔 그 돌이 우승 돌인지?
    if (chkWin(x, y, 'white', newStone)) {
      setWin('white')
      return
    }

    // 컴퓨터(black)에 차례 맡기기
    setTurn('black')
    setTimeout(() => {
      blackSetStone(newStone)
    }, 500)

  }

  // 컴퓨터(black)의 오목 알고리즘
  /*
  * [오목의 승리 조건]
  * 1. 5개를 연속으로 놓으면 승리
  *
  * [오목의 게임 전략]
  * 1. 중앙부터 두기
  * 2. 상대의 돌 옆에 두기
  * 3. 자신의 돌이 4개 연속인 경우 반드시 둬야 함
  *   -> 자신의 돌이 x, y, 대각선 좌표가 연속으로 4개인 경우
  * 4. 상대의 돌이 4개 연속인 경우 막아야 함
  *   -> 상대의 x, y, 대각선 좌표가 연속으로 4개인 경우
  * 5. 자신의 돌이 3개 연속인 경우 반드시 옆에 둬야 함
  *   -> 자신의 돌이 x, y, 대각선 좌표가 연속으로 3개인 경우
  * 6. 상대의 돌이 3개 연속인 경우 반드시 옆에 둬야 함(=막아야 함)
  *   -> 상대의 돌이 x, y, 대각선 좌표가 연속으로 3개인 경우
  * 
  * */
  const blackSetStone = (currentStone :typeof stone) => {
    //  점수 배열
    const score:number[][] = Array.from({length: BOARD_SIZE}, () => Array(BOARD_SIZE).fill(0))
    const level = Math.random() < 0.5 ? 'defensive' : 'aggressive'

    // 각 빈칸에 점수 부여
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y= 0; y < BOARD_SIZE; y++) {
        // 이미 돌이 있는 곳이면 패스
        if (currentStone.some(s => s.x === x && s.y === y)) continue

        if (calculateStone(x, y, 'black', currentStone) === 5) {
          score[x][y] = 100
          continue
        }

        // 1. 자신이 4목을 둘 수 있는 곳
        if (calculateStone(x, y, 'black', currentStone) === 4) {
          score[x][y] = level === 'defensive' ? 60 : 80
          continue
        }

        // 2. 상대가 4목을 둘 수 있는 곳
        if (calculateStone(x, y, 'white', currentStone) === 4) {
          score[x][y] = level === 'defensive' ? 80 : 60
          continue
        }

        // 3. 자신이 3목을 둘 수 있는 곳
        if (calculateStone(x, y, 'black', currentStone) === 3) {
          score[x][y] = level === 'defensive' ? 80 : 60
          continue
        }

        // 4. 상대가 3목을 둘 수 있는 곳
        if (calculateStone(x, y, 'white', currentStone) === 3) {
          score[x][y] = level === 'defensive' ? 60 : 80
          continue
        }

        // 5. 중앙 칸
        const centre = Math.floor(BOARD_SIZE / 2)
        score[x][y] = Math.max(score[x][y], 10 - Math.abs(x - centre) - Math.abs(y - centre))
      }
    }

    // 점수가 가장 높은 위치 선택
    let maxScore = -1
    let best = { x: 0, y: 0 }

    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (score[x][y] > maxScore) {
          maxScore = score[x][y]
          best = { x, y }
        }
      }
    }

    // 선택한 칸에 돌 두기
    const newStone = [...currentStone, { x: best.x, y: best.y, color: 'black' as const }]
    setStone(newStone)
    setTurn('white')

    // 같은 stone이 연속으로 5개 있으면 true / false
    if(chkWin(best.x, best.y, 'black', newStone)) {
      setWin('black')
      return
    }

  }

  // 돌 계산 함수
  const calculateStone = (
    x:number,
    y:number,
    color: 'black' | 'white',
    stone : {x: number, y: number, color: 'black' | 'white'}[],
    ) => {

    // 보드 상태(=돌 놓인 위치) 조회
    /*
    * x, y : 좌표
    * black, white : 그 좌표에 두어진 돌 색깔
    * stone : 현재 보드에 두어진 모든 돌들의 배열
    * map()로 파악하면 더 빨리 파악할 수 있다.
    * ex)
    * 원래 돌 정보:
      [
        {x: 1, y: 2, color: 'black'},
        {x: 2, y: 2, color: 'white'},
        {x: 3, y: 2, color: 'black'}
      ]

      ↓ (변환)

      지도(Map):
      "1,2" → "black"
      "2,2" → "white"
      "3,2" → "black"
    *
    * const direction = 가로, 세로, 오른쪽 위, 오른쪽 아래 탐색하기 위한 방향 설정
    *
        ↖  ↑  ↗
         \ | /
      ←  - ● -  →  (현재 위치)
         / | \
        ↙  ↓  ↘
    * 4방향만 한 이유 : 나머지도 나중에 확인할 예정이어서
    *
    *
    *
    * */
    const getStone = new Map(stone.map(s => [`${s.x},${s.y}`, s.color]))
    getStone.set(`${x},${y}`, color)

    // 방향 정하기
    const directions = [
      {dx: 1, dy: 0}, // 가로
      {dx: 0, dy: 1}, // 세로
      {dx: 1, dy : -1}, // 오른쪽 위
      {dx: 1, dy: 1}, // 오른쪽 아래
    ]

    let maxCnt = 1 // 지금 넣은 돌부터 카운트 시작

    /*
    *
    * 현재 위치: (3, 2)에 검은돌 놓음
      가로 방향(→) 확인:

      1번째: (4, 2) 확인 → 검은돌 있음! count = 2
      2번째: (5, 2) 확인 → 검은돌 있음! count = 3
      3번째: (6, 2) 확인 → 흰돌 있음 → 멈춤
    *
    * */

    for (const {dx, dy} of directions) { // 각 4방향(direction에서 설정)부터 시작
      let count = 1 // 현재 돌부터 시작

      let nx = x + dx  // 다음 가로위치
      let ny = y + dy  // 다음 세로위치
      while (getStone.get(`${nx},${ny}`) === color) { // 각 좌표마다 같은색 돌 있는지 확인하는 조건
        count++  // 하나 찾으면 추가
        nx += dx // 더 멀리 이동
        ny += dy //     "
      }

      nx = x - dx  // 반대 방향 가로
      ny = y - dy  // 반대 방향 세로
      while (getStone.get(`${nx},${ny}`) === color) { // 각 좌표마다 같은색 돌을 찾는다면
        count++   // 하나 찾으면 추가
        nx -= dx  // 더 멀리 이동
        ny -= dy  //     "
      }

    if(count >= maxCnt) maxCnt = count

    }

    return maxCnt
  }

  const chkWin = (
    x:number,
    y:number,
    color: 'black' | 'white',
    stone : {x: number, y: number, color: 'black' | 'white'}[],
  ) => {
    return calculateStone(x, y, color, stone) >= 5
  }

  return (
    <div id="root">
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        {win && (
          <div className="overlay">
            <div className="modal">
              <h2>{win === 'black' ? 'Black' : 'White'} 가 이겼습니다!</h2>
              <button onClick={() => {
                setStone([])
                setTurn('white')
                setWin(null)
              }}>
                다시하기
              </button>
            </div>
          </div>
        )}

        <div
          className="gomoku-container"
          style={{ height: '100%', width: '100%' }}
        >
        {/* 보드 */}
          <GomokuBoard
            stone= {stone}
            placeStone= {handlePlaceStone}
          />
        </div>
      </Stack>
    </div>
  )
}

export default Gomoku
