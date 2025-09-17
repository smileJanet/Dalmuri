import '../../../../style/lottery.css'
import { useState } from 'react'

/*
* [랜덤값 공식 : 시작수 더하고 끝수 곱하고]
*
* EX. 1~100 사이 랜덤값을 구해주는 함수 만들기
*  const random = Math.random()*100 + 1
*  = Math.floor(Math.random() * 끝수) + 시작수
*
* Math.random()은 0 ~ 1사이 반환
* Math.floor()은 소숫점 버림
*
* */

/*
* do ~ while
* (1) do 블록 안의 코드는 무조건 1번은 실행
* (2) 그 다음 while문 실행
* (3) - 1 : 조건이 true라면 do블록 반복
* (3) - 2 : 조건이 false라면 종료
*
* */

const Lottery = () => {

  const [result, setResult] = useState<number[]>(Array(6).fill(0))
  const [index, setIndex] = useState<number>(0)
  const [isFlag, setFlag] = useState<boolean>(false)
  const [isComplete, setComplete] = useState<boolean>(false)

  const handleLottery = () => {
    if(index >= 6) {
      setComplete(true)
      setFlag(false)
      return
    }

    let numbers = 0
    const res = [...result] // result배열 얕은 복사

    do {
      numbers = Math.floor(Math.random() * 45) + 1
    } while(res.includes(numbers))

    res[index] = numbers // ex: index=0이면 res[0] = 20(랜덤으로 뽑은 숫자),

    setResult(res)
    setIndex(index + 1) // index에 1 증가(다음 자리에 랜덤 숫자를 넣기 위해)
    setFlag(true)
  }

  const handleReset = () => {
    setResult(Array(6).fill(0))
    setIndex(0)
    setFlag(false)
    setComplete(false)
  }

  return(
    <div className="lottery-container">
      {!isComplete && !isFlag && (
        <div
          className= "ticket"
          onClick= {handleLottery}
        >
          TICKET
        </div>
      )}

      {!isComplete && isFlag && (
        <div className="ticket-board">
          {index}번째 숫자 : {result[index - 1]}
          <div
            className= "ticket-btn"
            onClick= {handleLottery}
          >
            TICKET
          </div>
        </div>
      )}

      {isComplete && (
        <div className="ticket-board">
          <div>🎉 완성된 번호: {result.join(', ')}</div>
          <button className="reset-btn" onClick={handleReset}>다시 뽑기</button>
        </div>
      )}
      <div className="sparkle">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Lottery