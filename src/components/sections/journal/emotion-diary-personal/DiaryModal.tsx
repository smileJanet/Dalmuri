import '../../../../style/journal/diarymodal.css'
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
import { useNavigate } from 'react-router-dom'

/**
 * [TODO] 감정 다이어리 기준 - DB 설계 시 저장 & 관리할 것
 *
 *  [감정 7단계] - 나중에 DB에 저장해서 관리하던가 할것
 *  1. 깊은 어둠(#4B3F72), score >= -1.0 && score <= -0.75 , sadMsg
 *  2. 잿빛 슬픔(#517EA6), score > -0.75 && score <= -0.5 , depressMsg
 *  3. 흐린 마음(#7BAACD), score > -0.5 && score <= -0.25 , dullMsg
 *  4. 고요한 평온(#A9D6C8), score > -0.25 && score <= 0.25 , calmMsg
 *  5. 맑은 미소(#F3E99F), score > 0.25 && score <= 0.5 , smileMsg
 *  6. 밝은 설렘(#FF9E80), score > 0.5 && score <= 0.75 , brightMsg
 *  7. 눈부신 행복(#F9A1A0), score > 0.75 && score <= 1.0 , happyMsg
 *
 **/

const DiaryModal = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [todayEmotion, setTodayEmotion] = useState({
    score: 0,
    color: '',
    dayCmnt: '',
    text: '이곳에 감정 결과가 나와요~',
  })

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
  * */

  const sadMsg = [
    `\n화를 낼 힘조차 사라졌어요. \n그저 마음이 무너지고 있어요.`,
    `\n분노의 불꽃이 사그라지고, \n차가운 슬픔만 남았어요.`,
    `\n세상에 화를 내기엔 \n너무 아파요. \n그저 위로가 필요해요.`,
    `\n마음이 부서져서, \n분노마저 잿빛이 되었어요.`,
    `\n울분이 아니라 \n눈물로 번진 하루예요. \n조용한 위로가 그리워요.`,
  ]

  const depressMsg = [
    `\n마음 한켠이 \n자꾸 쓸쓸해져요. \n이유 없이 불안해요.`,
    `\n괜찮은 척해도, \n안개 같은 걱정이 맴돌아요.`,
    `\n잔잔한 슬픔이 \n파도처럼 밀려와요. \n혼자가 된 기분이에요.`,
    `\n미세한 불안이 \n하루를 뒤덮었어요.\n 바람이 스며드는 듯 외로워요.`,
    `\n웃으려 해도, \n가슴속 어딘가가 \n자꾸 떨려요.`,
  ]

  const dullMsg = [
    `\n의욕이 사라져요. \n모든 게 흐릿하게 느껴져요.`,
    `\n조금만 더 잘했으면 하는 마음에 \n자꾸 자신을 책망해요.`,
    `\n마음이 축 처져요. \n아무것도 하기 싫은 하루예요.`,
    `\n괜찮은 줄 알았는데, \n기대했던 만큼 \n실망도 커요.`,
    `\n가만히 있어도 \n마음이 무거워요. \n나 자신이 작게 느껴져요.`
  ]

  const calmMsg = [
    `\n마음이 조용해요. \n바람결처럼 부드러운 하루예요.`,
    `\n크게 기쁘지도, \n슬프지도 않아요. 그저 평온해요.`,
    `\n잔잔한 물결처럼, \n감정이 고요하게 흐르고 있어요.`,
    `\n특별한 일은 없지만, \n그것도 나쁘지 않아요.`,
    `\n마음이 쉬어가고 있어요. \n오늘은 그냥 이대로 좋아요.`
  ]

  const smileMsg = [
    `\n햇살 같은 하루예요. \n마음이 조금 따뜻해졌어요.`,
    `\n사소한 일에도 \n미소가 번져요. \n이런 평범함이 좋아요.`,
    `\n커피 한 모금에도 \n행복을 느껴요. \n마음이 편안해요.`,
    `\n누군가의 한마디가 \n오늘을 조금 더 \n따뜻하게 만들었어요.`,
    `\n별일 없지만 괜찮아요..\n지금 이 순간이 고마워요.`
  ]

  const brightMsg = [
    `\n마음이 들떠요! \n오늘은 뭔가 좋은 일이 \n있을 것 같아요.`,
    `\n설레는 예감이 스며들어요. \n세상이 조금 더 밝게 보여요.`,
    `\n작은 일에도 웃음이 나요. \n하루가 가볍게 흘러가요.`,
    `\n조금만 더 노력하면 \n뭐든 될 것 같은 기분이에요!`,
    `\n기분 좋은 바람이 불어요. \n모든 게 새롭게 느껴져요.`
  ]

  const happyMsg = [
    `\n세상이 빛나요! \n마음이 꽉 차서 \n눈물이 날 만큼 행복해요.`,
    `\n모든 게 고마워요. \n존재만으로도 벅차올라요.`,
    `\n가슴이 두근거려요. \n사랑과 기쁨이 넘쳐흘러요.`,
    `\n오늘은 정말 찬란해요. \n나 자신이 빛나고 있어요.`,
    `\n이 순간이 영원했으면 좋겠어요. \n행복이 터질 것 같아요.`
  ]

  async function getResultFromGoogle() {
    if(!text) {
      alert('텅 비었잖아! 이럴거야?(´・ω・)')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/diary/get-diary-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text) // Http Body에 JSON으로 담아서 WAS단으로 전송하므로, WAS단에선 @RequestBody를 사용하여 JSON -> Java 데이터로 변환해야 한다.
      })

      if(response.ok){
        const result = await response.json()
        console.log('감정 분석 결과 : ', result)
        await setEmotion(result.score)
      } else {
        console.error('서버 응답 오류 : ', response.status)
      }
    } catch (e) {
      console.error('예상치 못한 에러 발생 : ', e)
    }
  }

  async function setEmotion(score: number) {
    const userScore = Math.round((score + 1) * 50)

    switch (true) {
      case score >= -1.0 && score <= -0.75:
        setTodayEmotion({
          score: userScore,
          color: '#4B3F72',
          dayCmnt: `밤이 길게 내려앉았어요.\n하지만 이 어둠도 곧 끝나요`,
          text: '[깊은 어둠]\n' + sadMsg[Math.floor(Math.random() * sadMsg.length)]
        })
        break;
      case score > -0.75 && score <= -0.5 :
        setTodayEmotion({
          score: userScore,
          color: '#517EA6',
          dayCmnt: `하늘이 흐려도,\n그 안엔 여전히 빛이 숨어있어요.`,
          text: '[잿빛 슬픔]\n' + depressMsg[Math.floor(Math.random() * depressMsg.length)]
        })
        break;
      case score > -0.5 && score <= -0.25 :
        setTodayEmotion({
          score: userScore,
          color: '#7BAACD',
          dayCmnt: `바람이 차지만,\n언젠가 이 구름도 걷히겠죠.`,
          text: '[흐린 마음]\n' + dullMsg[Math.floor(Math.random() * dullMsg.length)]
        })
        break;
      case score > -0.25 && score <= 0.25 :
        setTodayEmotion({
          score: userScore,
          color: '#A9D6C8',
          dayCmnt: `고요한 마음에 작은 파도가 일어요. \n그것도 괜찮아요.`,
          text: '[고요한 평온]\n' + calmMsg[Math.floor(Math.random() * calmMsg.length)]
        })
        break;
      case score > 0.25 && score <= 0.5 :
        setTodayEmotion({
          score: userScore,
          color:'#F3E99F',
          dayCmnt: `햇살이 스며드는 마음이에요. \n당신의 웃음이 참 고와요.`,
          text: '[맑은 미소]\n' + smileMsg[Math.floor(Math.random() * smileMsg.length)]
        })
        break;
      case score > 0.5 && score <= 0.75 :
        setTodayEmotion({
          score: userScore,
          color: '#FF9E80',
          dayCmnt: `마음이 콩닥거려요.\n오늘은 좋은 일이 올 것 같아요.`,
          text: '[밝은 설렘]\n' + brightMsg[Math.floor(Math.random() * brightMsg.length)]
        })
        break;
      case score > 0.75 && score <= 1.0 :
        setTodayEmotion({
          score: userScore,
          color: '#F9A1A0',
          dayCmnt: `모든 게 찬란해요.\n오늘은 당신의 빛이 세상을 물들여요.`,
          text: '[눈부신 행복]\n' + happyMsg[Math.floor(Math.random() * happyMsg.length)]
        })
        break;
    }
  }

  /*
  * [파일경로 !== URL경로]
  * React앱은 브라우저가 인식하는 물리적인 URL 구조와 개발자가 정의한 가상의 라우팅 구조를 분리하고 있다.
  *
  * ex) Router.tsx에서
  * {
  *   path: '/pages',
  *   children : [
  *     { path: 'journal/emotion-diary-personal/EmotionResult', element: <EmotionResult /> }
  *   ]
  * }
  * 다음과 같이 설정했다면,
  * React Router는 이것을 보고 "URL이 /pages/journal/emotion-diary-personal/EmotionResult일 때
  * EmotionResult 컴포넌트를 렌더링하겠다"
  * 라고 기억한다.
  * 즉, 파일 위치가 아닌 path속성으로 정의된 문자열이 라우팅의 기준이 되는 것이다.
  *
  * [🧭 실제 동작 흐름]
  * 1. 사용자가 navigate('/pages/journal/emotion-diary-personal/EmotionResult') 호출
  * 2. 브라우저 주소가 '/pages/journal/emotion-diary-personal/EmotionResult'로 변경됨
  * 3. React Router는 내부 클래스에서 path를 찾음
  *  * {
  *   path: '/pages',
  *   children : [
  *     { path: 'journal/emotion-diary-personal/EmotionResult', element: <EmotionResult /> }
  *   ]
  * }
  * ... 이걸 보고 path경로를 찾는다.
  * 4. 해당 경로가 존재하므로 EmotionResult를 렌더링함
  * 5. 렌더링 시 EmotionResult가 import된 파일을 불러옴 => 해당 컴포넌트 호출!
  *
  * */
  async function moveToResultPage () {
    navigate('/pages/journal/emotion-diary-personal/EmotionResult', {
      state: todayEmotion,
    })
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
            {
              (todayEmotion.color == '')
                ? todayEmotion.text
                :
                <div>
                  오늘의 감정 점수: {todayEmotion.score}점
                  <br />
                  오늘의 한마디: {todayEmotion.dayCmnt}
                </div>
            }
          </div>
          <div className="diary-modal-footer-content-right">
            {
              (todayEmotion.color == '') ?
            <div
              className="diary-modal-footer-content-right-btn"
              onClick={()=> getResultFromGoogle()}
            >
              보내기
            </div> :
            <div
              className="diary-modal-footer-content-right-btn"
              onClick={()=> moveToResultPage()}
            >
              저장하기
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiaryModal