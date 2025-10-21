import '../../../../style/journal/drawlots.css'
import Stack from '@mui/material/Stack'
import { ChangeEvent, useEffect, useState } from 'react'

/*
* [Array.from]
* : 배열을 만드는 함수
*
* EX. Array.from({length: x})
* -> 길이가 x개인 배열을 만듦
* -> x = 3이면, [undefined, undefined, undefined]가 만들어짐
* 
* [Math.random() - 0.5]
* : 배열을 랜덤하게 섞는 방법
* */

const DrawLots = () => {
  type DrawStep = 'start'| 'set' | 'mix' | 'pick'

  const [step, setStep] = useState<DrawStep>('start')
  const [lot, setLot] = useState(2)
  const [show, setShow] = useState<boolean[]>([])
  const [lotVal, setLotVal] = useState<string[]>([])
  const [shakeVal, setShakeVal] = useState<string[]>([])

  const increment = () => setLot(p => Math.min(p + 1, 10)) // 최대 10
  const decrement = () => setLot(p => Math.max(p - 1, 2)) // 최소 0

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value)
    if(isNaN(value)) value = 0

    value = Math.max(2, Math.min(value, 10))
    setLot(value)
  }

  function handleMixLots(){
    setStep('mix')

    setTimeout(() => {
      const shake = [...lotVal].sort(() => Math.random() - 0.5)
      setShakeVal(shake)
      setShow(Array(lot).fill(false))
      setStep('pick')
    }, 3000)
  }

  useEffect(() => {
    setStep('start')
  }, [])

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <div className="drawLots-container">
        {/* 시작 전 */}
        {step === 'start' && (
          <div
            className="before-start"
            onClick={() => setStep('set')}
          >
            시작 하기!
          </div>
        )}

        {/* 시작 버튼 누른 후, 섞기 전 */}
        {step === 'set' && (
          <div className="after-start">
            <div className="lots-range">
              <button onClick={decrement}> - </button>
              <input
                 type= "text"
                 value= {lot}
                 onChange={handleChange}
              />
              <button onClick={increment}> + </button>
            </div>
            <div className="lots">
              {Array.from({length: lot}).map((_, idx) => (
                <div key={idx} className="lot">
                  <input
                    type="text"
                    className="lot-input"
                    value={lotVal[idx]}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => {
                      const newVal = [...lotVal]
                      newVal[idx] = e.target.value
                      setLotVal(newVal)
                    }}
                  />
                </div>
                ))}
            </div>
            <div
              className="mix-btn"
              onClick={handleMixLots}
            >
              섞기!
            </div>
          </div>
        )}

        {/* 섞는 중 화면 */}
        {step ==='mix' && (
          <div className="mixing">
            섞는중...
          </div>
        )}

        {/* 섞고 나서 뽑기 */}
        {step === 'pick' && (
          <div
            className="after-start"
          >
            <div className="lots">
              {shakeVal.map((val, idx) => (
                <div key={idx} className="lot" onClick={() => {
                  const newShow = [...show]
                  newShow[idx] = true
                  setShow(newShow)
                }}>
                  {show[idx] && (
                    <div
                      className="lot-picked"
                    >
                      {val}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(step === 'pick') && show.every(v => v) && (
          <div
            className="reset"
            onClick={() => {
              setStep('start')
              setLot(2)
              setLotVal(Array(lot).fill(''))
              setShakeVal(Array(lot).fill(''))
            }}
          > 초기화하기
          </div>
        )}
      </div>
    </Stack>

  )
}

export default DrawLots