import Stack from '@mui/material/Stack'
import DiaryModal from 'components/sections/journal/emotion-diary-personal/DiaryModal.tsx'
import '../../../../style/diarymodal.css'

const MainEdiary = () => {
  /*
  * [동적 계획법(Dynamic Programming, DP)]
  * : 컴퓨터가 문제를 부분 문제로 쪼개서 푸는 것
  * 즉 “한 번 계산한 결과를 저장해두고, 나중에 또 계산할 때 다시 쓰는 방식”
  *
  * 오늘의 감정 변화량을 계산할 때 사용한다.
  * ex) “어제보다 나아졌나?” “이틀 전보다 안정적인가?”
  *
  * API 호출 -> 결과값 -> 10개의 등급으로 나누기 (1~100점, 10점씩) 
  * API 결과값으로 나온 점수로 감정 변화량 계산
  *
  * */

  return (
    <div id="root">
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <div
          className="diary-container"
          style={{ height: '100%', width: '100%', backgroundColor: 'white'}}
        >
          <DiaryModal />
        </div>
      </Stack>
    </div>
  )
}

export default MainEdiary