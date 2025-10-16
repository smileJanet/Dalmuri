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

  /*
  * [Google Cloud - Natural Language API]
  * 해당 라이브러리, api를 통해서 텍스트의 감정을 분석
  *
  * 현재 프로젝트는 vite + react이므로 백엔드 서버에서 API를 호출해야 한다.
  * 따라서 구글 API를 호출하기 위해선 backend에 작성해야 한다.
  * */

  async function getResultFromGoogle() {
    try {
      const response = await fetch('http://localhost:3001/diary/get-diary-score')
      console.log(`결과값 : ${response}`)
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
            보내기를 누르면, AI 감정 다이어리가 오늘의 감정 점수를 매겨줘요~
            (보내기 누른 후 여기에 response값 전달)
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