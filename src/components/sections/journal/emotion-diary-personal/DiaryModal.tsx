import '../../../../style/diarymodal.css'
import AvatarImage from '../../../../assets/images/avatar.png';
import { useState } from 'react'
import Font from '../../../../assets/images/font.png';
import Image from '../../../../assets/images/image.png';
import Invite from '../../../../assets/images/invite.png';
import Report from '../../../../assets/images/report.png';
import Nickname from '../../../../assets/images/nickname.png';
import File from '../../../../assets/images/file.png';
import Edit from '../../../../assets/images/edit.png';
import Friend from '../../../../assets/images/friend.png';
import Help from '../../../../assets/images/help.png';

const DiaryModal = () => {
  const [text, setText] = useState('')
  const [result, setResult] = useState('이곳에 감정결과가 나와요~')

  /*
  * [Google Cloud - Natural Language API]
  * 해당 라이브러리, api를 통해서 텍스트의 감정을 분석
  *
  * 현재 프로젝트는 vite + react이므로 백엔드 서버에서 API를 호출해야 한다.
  * 따라서 구글 API를 호출하기 위해선 backend에 작성해야 한다.
  *
  * [결과]
  * magnitude: number, [0, +inf] 범위의 음수가 아닌 숫자로, 점수 (긍정 또는 부정)와 관계없이 감정의 절대 크기
  * score: number, 감정 점수로, -1.0(부정적인 감정)부터 1.0(긍정적인 감정)까지
  *
    ① 깊은 어둠	-1.0 ~ -0.75	절망 / 분노	마음이 무너지는 수준의 감정 폭발. 강한 분노나 깊은 상실. #3c1f6b
    ② 잿빛 슬픔	-0.75 ~ -0.5	슬픔 / 불안	서늘한 슬픔, 걱정, 외로움이 깔린 감정. #1c2854
    ③ 흐린 마음	-0.5 ~ -0.25	우울 / 실망	기운이 빠지고 의욕이 사라지는 상태. 실망이나 자책. #4A5568
    ④ 고요한 평온	-0.25 ~ 0.25	중립 / 평안	마음이 잔잔하고 특별히 요동치지 않는 상태. 안정감. #B8F4FA
    ⑤ 맑은 미소	0.25 ~ 0.5	만족 / 따스함	소소한 행복, 마음의 여유, 안정된 긍정. #94EBC0
    ⑥ 밝은 설렘	0.5 ~ 0.75	기쁨 / 기대감	무언가 잘 풀릴 것 같은 생기 있는 긍정. 활기찬 감정. #FFED8F
    ⑦ 눈부신 행복	0.75 ~ 1.0	행복 / 희열	벅차오르는 감정, 감사나 사랑이 넘치는 순간. #FFDD3F
  *
  * */

  async function getResultFromGoogle() {
    try {
      const response = await fetch('http://localhost:3001/diary/get-diary-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text)
      })

      if(response.ok){
        const result = await response.json()
        console.log('감정 분석 결과 : ', result)
        setResult(result.score)
      } else {
        console.error('서버 응답 오류 : ', response.status)
      }
    } catch (e) {
      console.error('예상치 못한 에러 발생 : ', e)
    }
  }

  return(
    <div className="diary-modal-container">
      <div className="diary-modal-titlebar">
        <div>_</div>
        <div>□</div>
        <div>X</div>
      </div>
      <div className="diary-modal-topbar">
        <div className="diary-modal-topbar-item">
          <img src={File} alt="file" />
          <div className="diary-modal-topbar-text">
            파일
          </div>
        </div>
        <div className="diary-modal-topbar-item">
          <img src={Edit} alt="edit" />
          <div className="diary-modal-topbar-text">
            편집
          </div>
        </div>
        <div className="diary-modal-topbar-item">
          <img src={Friend} alt="friend" />
          <div className="diary-modal-topbar-text">
            친구
          </div>
        </div>
        <div className="diary-modal-topbar-item">
          <img src={Help} alt="help" />
          <div className="diary-modal-topbar-text">
            도움말
          </div>
        </div>
      </div>
      <div className="diary-modal-body">
        <div className="diary-modal-content-header">
          <div>
            <img src={AvatarImage} alt="avatar"/>
          </div>
          <div className="diary-modal-content-header-title">
            다이어리(emotion-diary)와 대화
          </div>
        </div>
        <div className="diary-modal-content-body">
          <textarea
            className="diary-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
          />
          <div className="char-count">
            {text.length} / 1000자
          </div>
        </div>
      </div>
      <div className="diary-modal-footer">
        <div className="diary-modal-footer-topbar">
          <div className="diary-modal-footer-topbar-item">
            <div className="diary-modal-footer-topbar-icon">
              <img src={Font} alt="font" />
            </div>
            <div className="diary-modal-footer-topbar-text">
              글꼴
            </div>
          </div>
          <div className="diary-modal-footer-topbar-item">
            <div className="diary-modal-footer-topbar-icon">
              <img src={Image} alt="image" />
            </div>
            <div className="diary-modal-footer-topbar-text">
              이미지
            </div>
          </div>
          <div className="diary-modal-footer-topbar-item">
            <div className="diary-modal-footer-topbar-icon">
              <img src={Invite} alt="invite" />
            </div>
            <div className="diary-modal-footer-topbar-text">
              초대
            </div>
          </div>
          <div className="diary-modal-footer-topbar-item">
            <div className="diary-modal-footer-topbar-icon">
              <img src={Report} alt="report" /> 
            </div>
            <div className="diary-modal-footer-topbar-text">
              신고
            </div>
          </div>
          <div className="diary-modal-footer-topbar-item">
            <div className="diary-modal-footer-topbar-icon">
              <img src={Nickname} alt="nickname" />
            </div>
            <div className="diary-modal-footer-topbar-text">
              별명
            </div>
          </div>
        </div>
        <div className="diary-modal-footer-content">
          <div className="diary-modal-footer-content-left">
            {result}
          </div>
          <div className="diary-modal-footer-content-right">
            <div
              className="diary-modal-footer-content-right-btn"
              onClick={()=>getResultFromGoogle()}
            >
              보내기
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryModal