import Grid from '@mui/material/Grid';
import ChatListGrid from 'components/sections/chat/ChatListGrid.tsx';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconifyIcon from "components/base/IconifyIcon.tsx";

const Chat = () => {
  return(
    <Grid container spacing={{ xs: 2, sm: 2.5, lg: 3 }}>
      <Grid item xs={12}>
        <ChatListGrid />
      </Grid>

        {/*채팅방 추가 버튼*/}
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
                {/* (1) 모바일 화면에서의 채팅방 - 글자 크기, 비율 줄이기*/}
                {/* (2) 버튼 클릭 시 FriendListPopup 뜨게 하기*/}
                <IconifyIcon icon={'mingcute:plus-fill'} />
            </Button>
        </Box>
    </Grid>
  );
};

export default Chat;
