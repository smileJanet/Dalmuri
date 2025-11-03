import '../../../../style/journal/gomoku.css'
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
  const [win, setWin] = useState<'black' | 'white' | 'draw' | null>(null)

  // 기존: stone을 통해 1차원 배열을 계속 update
  // 현재: boardGrid를 통해 stone을 2차원 배열에 보관
  const createBoardGrid = (currentStone: typeof stone) => {
    // 빈 보드 생성
    const grid: ('black' | 'white' | null)[][] = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null))

    // 돌의 이치를 O(1)접근이 가능한 2차원 배열에 저장
    for (const s of currentStone) {
      grid[s.x][s.y] = s.color
    }
    return grid
  }

  const handlePlaceStone = (x: number, y:number) => {
    // 1. min(beta, 상대)턴이 아니거나 이미 승자가 있다면 종료
    if(turn !== 'white' || win !== null) return

    // 2. 이미 돌이 있는 칸인지 확인
    if(stone.some(s => s.x === x && s.y === y)) return

    // 3. 돌을 칸에 두고 상태 업데이트
    const newStone = [...stone, {x, y, color: 'white' as const}]
    setStone(newStone)

    // 4. 방금 둔 그 돌이 우승 돌인지 확인
    const newGrid = createBoardGrid(newStone)

    if (chkWin(x, y, 'white', newGrid)) {
      setWin('white')
      return
    }

    if (isGameOver(newGrid) === 'draw') {
      setWin('draw')
      return
    }

    // 컴퓨터(black)에 차례 맡기기
    setTurn('black')
    setTimeout(() => {
      // setBlackStone에서 1차원 배열(newStone)을 전달하여 setBlackStone 내부에서 2차원 Grid를 생성하는 것이 일반적
      setBlackStone(newStone)
    }, 500)

  }

  // 패턴 분석 : 몇개의 돌이 연속으로 이어지는지 계산하는 함수
  const calculateStone = (
    x:number,
    y:number,
    color: 'black' | 'white',
    boardGrid: ('black' | 'white' | null)[][]
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
    
    // 기존 : 함수 실행마다 새로운 map을 그려야 해서 성능 떨어짐
    // const getStone = new Map(stone.map(s => [`${s.x},${s.y}`, s.color]))
    // getStone.set(`${x},${y}`, color)
    
    const originalColor = boardGrid[x][y]
    boardGrid[x][y] = color // 가상의 돌

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
      while (
        nx >= 0 &&
        nx < BOARD_SIZE &&
        ny >= 0 &&
        ny < BOARD_SIZE &&
        boardGrid[nx][ny] === color
        ) { // 각 좌표마다 같은색 돌 있는지 확인하는 조건
        count++  // 하나 찾으면 추가
        nx += dx // 더 멀리 이동
        ny += dy //     "
      }

      nx = x - dx  // 반대 방향 가로
      ny = y - dy  // 반대 방향 세로
      while (
        nx >= 0 &&
        nx < BOARD_SIZE &&
        ny >= 0 &&
        ny < BOARD_SIZE &&
        boardGrid[nx][ny] === color
        ) { // 각 좌표마다 같은색 돌을 찾는다면
        count++   // 하나 찾으면 추가
        nx -= dx  // 더 멀리 이동
        ny -= dy  //     "
      }

      if(count >= maxCnt) maxCnt = count

    }
    boardGrid[x][y] = originalColor
    return maxCnt
  }

  // 단순 승리 확인(방금 둔 돌 1개만 검사)
  const chkWin = (
    x:number,
    y:number,
    color: 'black' | 'white',
    currentGrid : ('black' | 'white' | null)[][],
  ) => {
    return calculateStone(x, y, color, currentGrid) >= 5
  }

  // 돌 세팅
  const setBlackStone = (currentStone :typeof stone) => {
    // 1. 단일 단계 평가(1-Ply Evaluation)인 경우
    // const score = simpleScoreBlackStone(currentStone)
    //
    // // 점수가 가장 높은 위치 선택
    // let maxScore = -1
    // let best = { x: 0, y: 0 }
    //
    // for (let x = 0; x < BOARD_SIZE; x++) {
    //   for (let y = 0; y < BOARD_SIZE; y++) {
    //     if (score[x][y] > maxScore) {
    //       maxScore = score[x][y]
    //       best = { x, y }
    //     }
    //   }
    // }

    // 2. 알파-베타 가지치기 알고리즘을 적용한 경우
    const best = pruningScoreBlackStone(currentStone)

    //////////////////////////////////////////

    // 3. 선택한 칸에 돌 두고 1차원 배열 생성(기존 로직)
    const newStone = [...currentStone, { x: best.x, y: best.y, color: 'black' as const }]
    setStone(newStone)
    setTurn('white')

    // + 4. Grid 생성
    const newGrid = createBoardGrid(newStone)

    // 같은 stone이 연속으로 5개 있으면 true / false
    if(chkWin(best.x, best.y, 'black', newGrid)) {
      setWin('black')
      return
    }

  }

  /*
  * < 컴퓨터(black)의 오목 알고리즘 - 단일 단계 평가 >
  *
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
  * 
  * [더 어렵게 만들어볼려면]
  * 1. 나, 컴퓨터간 승률 계산
  * 2. 승률에 따라 defensive할지 aggressive할지 자동으로 변경됨
  *
  * => scoreBlackStone: 단일 단계 평가(1-Ply Evaluation)
  *   현재 보드 상태를 보고 "지금 돌을 두면 몇 목이 만들어지는지"에 기반하여 점수를 부여
  *   컴퓨터가 상대의 다음 수(미래)를 전혀 예측하지 않고 있음. 단순한 선후관계를 계산함
  *
  * */
  // const simpleScoreBlackStone = (currentStone :typeof stone) => {
  //   //  점수 배열
  //   const score:number[][] = Array.from({length: BOARD_SIZE}, () => Array(BOARD_SIZE).fill(0))
  //   const level = Math.random() < 0.5 ? 'defensive' : 'aggressive'
  //
  //   // 각 빈칸에 점수 부여
  //   for (let x = 0; x < BOARD_SIZE; x++) {
  //     for (let y= 0; y < BOARD_SIZE; y++) {
  //       // 이미 돌이 있는 곳이면 패스
  //       if (currentStone.some(s => s.x === x && s.y === y)) continue
  //
  //       if (calculateStone(x, y, 'black', currentStone) === 5) {
  //         score[x][y] = 100
  //         continue
  //       }
  //
  //       // (1) 자신이 4목을 둘 수 있는 곳
  //       if (calculateStone(x, y, 'black', currentStone) === 4) {
  //         score[x][y] = level === 'defensive' ? 60 : 80
  //         continue
  //       }
  //
  //       // (2) 상대가 4목을 둘 수 있는 곳
  //       if (calculateStone(x, y, 'white', currentStone) === 4) {
  //         score[x][y] = level === 'defensive' ? 80 : 60
  //         continue
  //       }
  //
  //       // (3) 자신이 3목을 둘 수 있는 곳
  //       if (calculateStone(x, y, 'black', currentStone) === 3) {
  //         score[x][y] = level === 'defensive' ? 80 : 60
  //         continue
  //       }
  //
  //       // (4) 상대가 3목을 둘 수 있는 곳
  //       if (calculateStone(x, y, 'white', currentStone) === 3) {
  //         score[x][y] = level === 'defensive' ? 60 : 80
  //         continue
  //       }
  //
  //       // (5) 중앙 칸
  //       const centre = Math.floor(BOARD_SIZE / 2)
  //       score[x][y] = Math.max(score[x][y], 10 - Math.abs(x - centre) - Math.abs(y - centre))
  //     }
  //   }
  //
  //   return score
  // }

  /*
  * < 컴퓨터(black)의 오목 알고리즘 - 알파&베타 가지치기 >
  * scoreBlackStone()는 1수 앞만 보고 가장 높은 점수에 돌을 두는 단일 단계 평가 방식 -> 다단계 탐색을 통해 정교하게 계산으로 개선해야 한다.
  *
  * [생각 가능한 알고리즘]
  * 1. Minimax 알고리즘 : 컴퓨터(max)는 자신의 점수를 최대화 하는 수를 찾고, 상대(min)는 컴퓨터의 점수를 최소화 하는 수를 둔다고 가정하고 최적의 수를 탐색
  *   -> '나쁜 수'를 피함
  *   -> ex. 4목 막기가 30점, 상대 3목 무시가 5점일 때, 5점짜리 "무시하는 수"를 피함
  *
  * 2. 알파-베타 가지치기 : Minimax 탐색 과정에서 승패가 확정되거나 이미 더 좋은 수가 있음이 확신하는 경우 비효율적인 분기(Branch)는 탐색하지 않아 연산 속도를 높임
  *   -> 미니맥스 알고리즘의 전략 중 하나
  *   -> '불필요한 계산'을 피함
  *   -> ex. 이미 30점짜리 수를 찾았는데(Alpha 경로), 다른 경로를 계산하다가 상대가 나를 막아 5점 이상 나올 수 없음(Beta 경로)을 확인하면,
  *          그 경로의 나머지 계산을 즉시 중단한다(Beta 경로 점수계산 중단 - 가지치기).
  * 
  * [알파 - 베타 가지치기 필수 조건]
  * 1. 다단계 탐색 : 트리의 깊이(depth) 개념 혹은 재귀 호출을 해야 한다.
  * 2. 가지치기 : 알파오 베타값을 사용하여 불필요한 경로를 제거해야 한다.
  *
  * */
  
  const MAX_DEPTH = 3 // 탐색 깊이 **3수 앞까지 예측할 것**

  // 게임이 종료되었는지 확인, 승자가 있다면 해당 색상을 반환하는 함수
  const isGameOver = (currentGrid: ('black' | 'white' | null)[][],) => {
    let stoneCount = 0 // 무승부 판정을 위한 돌의 총 개수

    // 1. 모든 돌이 5목을 달성한 경우
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        const color = currentGrid[x][y]

        // (1) 돌이 있는 칸만 검사
        if (color !== null) {
          stoneCount++

          if (calculateStone(x, y, color, currentGrid) >= 5) {
            return color
          }
        }
      }
    }
    
    // 2. 무승부(Draw)인 경우
    if (stoneCount === BOARD_SIZE * BOARD_SIZE) return 'draw'
    // setWin('draw')

    // 3. 게임 진행중인 경우
    return null

  }

  const calculateScore = (currentGrid: ('black' | 'white' | null)[][], alphaColor: 'white' | 'black'): number => {
    // 1. 종료 상태 점수
    const winner = isGameOver(currentGrid)
    if (winner === alphaColor) return 10000 // 컴퓨터 승리
    if (winner !== null) return -10000 // 상대(사람) 승리
    if (winner == 'draw') return 0 // 무승부

    // 무승부시 0을 반환할 수도 있으나 미니맥스에선 보통 MAX/MIN의 승패가 중요하다...
    let aiScore = 0
    let userScore = 0

    // 2. 현재 상태 평가 점수 (단일 단계 평가 활용)
    // 모든 칸을 탐색하여 AI와 상대의 잠재적 점수를 계산하고 차이를 반환한다.
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if(currentGrid[x][y] !== null) continue

        // (1) 컴퓨터(alpha, max)가 이 칸에 놓았을 때 잠재적 점수
        const aiCount = calculateStone(x, y, 'black', currentGrid)
        if (aiCount >= 5) aiScore += 10000
        else if (aiCount === 4) aiScore += 800
        else if (aiCount === 3) aiScore += 50
        else if (aiCount === 2) aiScore += 5
        
        // (2) 상대(beta, min)가 이 칸에 놓았을 때의 잠재적 함수
        const userCount = calculateStone(x, y, 'white', currentGrid)
        if (userCount >= 5) userScore += 10000
        else if (userCount === 4) userScore += 1000
        else if (aiCount === 3) userScore += 100
        else if (aiCount === 2) userScore += 10


        // 상대의 위협은 컴퓨터에게 '마이너스' 점수
        // total += (maxScore - minScore)

      }
    }

    // return total
    return aiScore - userScore
  }


  // 유효한 수(돌이 놓인 곳 주변 1~2칸)만 찾아서 배열로 반환하는 함수(필수 최적화)
  const findMove = (currentGrid: ('black' | 'white' | null)[][]) => {
    let stoneCount = 0
    const occupied = []

    // 1. Grid를 순회하며 돌의 개수를 세고, 돌의 위치를 저장
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (currentGrid[x][y] !== null) {
          stoneCount++
          occupied.push({ x, y }) // 돌이 놓인 놓인 좌표만 저장
        }
      }
    }

    // 2. 첫 수일 경우 중앙 반환
    if (stoneCount === 0) {
      const centre = Math.floor(BOARD_SIZE / 2)
      return [{ x: centre, y: centre }]
    }

    const possible = new Set<string>()

    // 3. 저장된 돌의 위치만 순회하여 이웃 탐색
    for (const { x, y } of occupied) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue

          const nx = x + dx
          const ny = y + dy

          // 보드 경계 체크
          if (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
            // 빈칸인지 체크
            if (currentGrid[nx][ny] === null) {
              possible.add(`${nx},${ny}`)
            }
          }

        }
      }
    }

    // Set을 {x, y} 객체 배열로 변환
    return Array.from(possible).map(key => {
      const [ xStr, yStr ] = key.split(',')
      return { x: parseInt(xStr), y: parseInt(yStr)}
    })

  }

  /*
  * [매우 중요!!!!!]
  * 미니맥스 함수 = 재귀 + 가지 치기
  *
  * 1. 종료 조건을 작성(기저 조건)
  *    게임이 끝날 경우 점수 계산을 위한 평가 함수를 호출하는 로직을 작성한다
  *
  * 2. Max 플레이어 턴
  *    가장 작은 값으로 시작해서 점점 최댓값을 찾아간다.
  *
  * 3. Min 플레이어 턴
  *    가장 큰 값으로 시작해서 점점 최솟값을 찾아간다.
  *
  * */
  const miniMax = (
    currentGrid: ('black' | 'white' | null)[][],
    depth: number,
    alpha: number,  // Max 플레이어가 확보한 최소 점수
    beta: number,   // Min 플레이어게 확보한 최대 점수
    isAorB: boolean // 현재 턴이 Max(alpha, 컴퓨터)인지 Min(beta, 사람)인지
  ): number => {

    /*
    * 1. 종료 조건 : Base Case
    * (1) 설정된 깊이에 도달했거나(더이상 예측할 필요가 없거나, 3까지 도달)
    * (2) 승패가 결정된 경우(게임 종료)
    * */
    if(depth === 0 || isGameOver(currentGrid) !== null) {
      // 탐색 끝이나 게임 종료 시 평가 함수 호출
      return calculateScore(currentGrid, 'black')
    }

    /*
    * 2. 둘 수 있는 가능한 모든 수 찾기
    * -> 미니맥스 : Max 플레이어는 가장 높은 점수를 택한다.
    *              Min 플레이어는 가장 낮은 점수를 택한다.
    * */
    const possible = findMove(currentGrid)
    if (isAorB) {
      // (1) Max턴 : 점수 최대화
      let maxScore = -Infinity

      for (const {x, y} of possible) {
        /*
        * [왜 원상 복구 해야 하는가?]
        * 미니맥스는 "각 후보(칸)별로 독립적인 결과"를 알고 싶어서 사용하는 로직읻.
        * 따라서 각 후보를 시뮬레이션할 때 보드 상태는 그 후보만 반영된 상태여야 한다.
        * 돌을 둔 후 재귀 계산을 한 뒤 돌을 다시 제거하지 않으면 다음 후보를 시뮬레이션할 때 이전 후보의 변경이 남아 있어서 결과가 뒤섞인다.
        *
        * (1) - 1 : currentGrid(원본)을 건드리지 않고 clone deep을 통해 상태 복사
        * const nextGrid = [...currentGrid]만 쓰면,
          2차원 배열의 “겉 껍질”만 복사되고, 안의 각 row 배열들은 여전히 원본을 참조
        * */
        const nextGrid = currentGrid.map(row => [...row])
        // (1) - 2 : 임의의 수 두기
        nextGrid[x][y] = 'black'

        // (1) -3 : 다음 단계 재귀 호출(상대방 턴으로 전환)
        const evaluation = miniMax(nextGrid, depth -1, alpha, beta, false)
        maxScore = Math.max(maxScore, evaluation)
        
        // (1) - 4 : alpha(Max 점수) 업데이트 및 가지 치기
        alpha = Math.max(alpha, maxScore)
        if (beta <= alpha) { // 상대의 점수보다 내(컴퓨터) 점수가 같거나 높을 것 같으면
          break // 그 밑에 있는 확률은 계산 안함. 가지치기 지점
          }
        }
        return maxScore
      
      } else {
      // (2) Min턴 : 점수 최소화
      let minScore = Infinity
      
      for (const {x, y} of possible) {
        // (2) - 1 : currentGrid(원본)을 건드리지 않고 clone deep을 통해 상태 복사
        const nextGrid = currentGrid.map(row => [...row])
        // (2) - 2 : 임의의 수 두기
        nextGrid[x][y] = 'white'

        // (2) - 3 : 다음 단계 재귀 호출(컴퓨터 턴으로 전환)
        const evaluation = miniMax(nextGrid, depth -1, alpha, beta, true)
        minScore = Math.min(minScore, evaluation)
        
        // (2) - 4 : beta(Min 점수) 업데이트 및 가지치기
        beta = Math.min(beta, minScore)
        if (beta <= alpha) { // 컴퓨터 점수보다 사람 점수가 낮을 것 같으면 -> 컴퓨터가 이긴다
          break // 가지치기 지점!
        }
        
      }
      return minScore

    }
  }

  // 최적의 수 선택하는 함수
  const pruningScoreBlackStone = (currentStone: typeof stone) => {
    // 단순한 점수 배열을 반환하지 않고 주어진 깊이(Depth) 내에서 탐색하여 찾은 최적의 점수를 변환하여 설계하여야 한다.
    // 1. 최초 1회 : boardGrid 생성
    const initGrid = createBoardGrid(currentStone)

    const possible = findMove(initGrid)

    // 2. 모든 후보 수의 단일 평가 점수를 계산
    const scoredMoves = possible.map(({ x, y }) => {
      // 단일 평가를 위해 Grid복사 및 가상으로 돌 두기
      const templeGrid = initGrid.map(row => [...row])
      templeGrid[x][y] = 'black'

      return {
        x,
        y,
        score: calculateScore(templeGrid, 'black')
      }
    })
    
    // 3. 점수가 높은 순으로 정렬하고, 상위 N개만 선택
    const topNMoves = scoredMoves
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)

    // 4. 상위 N개에 대해서만 미니맥스-알파베타 가지치기 탐색 수행 = '휴리스틱 최적화'
    /*
    * 휴리스틱 : 완벽한 방법은 아니지만 빠르고 효율적인 최선의 방법
    * 휴리스틱의 핵심 : "명백히 나쁜 수는 굳이 깊게 생각하지 말자!"
    *
    * ex) 모든 것을 탐색하진 못하고 상위 N개만 탐색하지만, 그대신 빠른 속도는 유지할 수 있으므로 "완벽한 방법은 아니지만 최선의 방법이었다!"
    * */
    let maxScore = -Infinity
    let best = { x: -1, y: -1 }

    // 상위 N개에 대해서 탐색할 후보 수 찾기
    for(const {x, y} of topNMoves) {
      // Max가 가상으로 돌을 둠 - 임시로 존재하는 보드 상태이므로 miniMax 호출 시 버려짐
      const nextGrid = initGrid.map(row => [...row])
      nextGrid[x][y] = 'black'
      
      // MinMax 알고리즘 호출
      // Max 플레이어(컴퓨터)가 수를 둔 상태이므로, 다음은 Min 플레이어(사람) 턴이다(false)
      const score = miniMax(nextGrid, MAX_DEPTH -1, -Infinity, Infinity, false)

      // 가장 높은 점수를 주는 수를 선택
      if(score > maxScore) {
        maxScore = score
        best = {x, y}
      }
    }
    return best
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
              <h2>{win === 'draw' ? '무승부입니다.' : `${win}가 이겼습니다.`}</h2>
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
