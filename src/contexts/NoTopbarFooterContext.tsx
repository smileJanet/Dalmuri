import { createContext, useContext, useState } from 'react'

type ChatRoomContextType = {
  isChatRoomOpen: boolean
  setChatRoomOpen: (value: boolean) => void
}

// Context API 부분
const NoTopbarFooterContext = createContext<ChatRoomContextType | undefined>(undefined)

export const NoTopbarFooterProvider = ({children} : {children: React.ReactNode}) => {
  const [isChatRoomOpen, setChatRoomOpen] = useState(false)

  return (
    <NoTopbarFooterContext.Provider value ={{ isChatRoomOpen, setChatRoomOpen }}>
      {children}
    </NoTopbarFooterContext.Provider>
  )
}

// Custom Hook 부분
export const useNoTopbarFooter = () => {
  const context = useContext(NoTopbarFooterContext)
  if(!context) throw new Error('useNoTopbarFooter must be used within a NoTopbarFooterProvider')
  return context
}

/*
* Context API : React에서 제공하는 내장 기능
* - 컴포넌트 트리 전체에 데이터를 공유하는 방법(전역 공유 상태로 데이터 전달)
* - props없이 컴포넌트 트리 전체에 데이터를 전달할 때 사용
* - 최상단에 정의해서 트리에 전달
* - useContext(), createContext()를 사용
*
* Custom Hook : 개발자가 React프로젝트에서 사용하기 위한 훅(use로 시작하는 함수)
* - 로직을 재사용하기 위해 만들어짐(함수로 분리)
* - 복잡한 로직이나 상태관리를 재사용할 때 사용
* - 어디서든 정의 가능, context와 같이 쓸 수 있음
* - 일반 함수 + React Hook(use~)로 사용
*
* */