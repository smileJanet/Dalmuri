export interface User {
  userCd?: string,
  userId: string,
  userNm?: string,
  password: string,
  bgColor?: string,
  textColor?: string,
}

export interface Message{
  msgCd: string,
  senderId: string,
  text: string,
  timestamp: string,
  isMine: boolean,
}

export const TEMP_USERS = [
  {
    userCd: '00',
    userId: 'admin',
    password: '1234',
    userNm: '킹갓관리자><',
    bgColor: '#FF6B6B',
    textColor: '#FFFFFF'
  },
  {
    userCd: '01',
    userId: 'user01',
    password: 'pass01',
    userNm: '킴주영',
    bgColor: '#6A3FE9',
    textColor: '#FFFFFF'
  },
  {
    userCd: '02',
    userId: 'user02',
    password: 'pass02',
    userNm: '김부구',
    bgColor: '#B6FFE0',
    textColor: '#0A1020'
  },
  {
    userCd: '03',
    userId: 'user03',
    password: 'pass03',
    userNm: '짱인켱',
    bgColor: '#002845',
    textColor: '#FFFFFF'
  },
];