import Grid from '@mui/material/Grid';
import ChatListGrid from 'components/sections/chat/ChatListGrid.tsx';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconifyIcon from "components/base/IconifyIcon.tsx";
import { useState } from 'react'
import FriendListPopup from 'components/common/FriendListPopup.tsx';
import { TEMP_USERS, User } from 'pages/common'
import ChatRoom from 'components/sections/chat/ChatRoom.tsx'
import { useNoTopbarFooter } from 'contexts/NoTopbarFooterContext.tsx'

const Chat = () => {
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<User|null>(null)
  const {isChatRoomOpen, setChatRoomOpen} = useNoTopbarFooter()

  const [friendList] = useState<User[]>(TEMP_USERS)

  const handleSelectFriend = (_friend: string) => {
    const selectedFriend = friendList.find(friend => friend.userNm === _friend);

    if (selectedFriend) {
      setSelectedFriend(selectedFriend)
      setChatRoomOpen(true)
    }
    setPopupOpen(false)
  }

  const handleGoBack = () => {
    setChatRoomOpen(false)
    setSelectedFriend(null)
  }

  return(
    <Grid container spacing={{ xs: 2, sm: 2.5, lg: 3 }}>
      {
        !isChatRoomOpen && (
          <Grid item xs={12}>
            <ChatListGrid />
          </Grid>
        )
      }

        {/*채팅방 추가 버튼*/}
        {!isChatRoomOpen && (
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=> setPopupOpen(true)} // 버튼 클릭 시 팝업 열기
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        boxShadow: 3,
                        minWidth: 0,
                        padding: 0,
                        fontSize: '1.5rem',
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    <IconifyIcon icon={'mingcute:plus-fill'} />
                </Button>
            </Box>
        )}

      {/* 친구 목록 팝업 */}
      <FriendListPopup
        open={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        friendList={friendList}
        onSelectFriend={handleSelectFriend}
      />

      {/* 채팅방 열기 */}
      {
        isChatRoomOpen && (
          <Grid item xs={12} xl={12}>
            <ChatRoom
              friend={selectedFriend}
              onBack={handleGoBack}
            />
          </Grid>
        )
      }
    </Grid>
  );
};

export default Chat;
