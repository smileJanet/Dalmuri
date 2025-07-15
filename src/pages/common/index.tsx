export interface Friend {
  friendCd: string,
  id: string,
  name: string,
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