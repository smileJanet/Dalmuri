import { Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemAvatar, useTheme } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import { User } from 'pages/common'
import Avatar from '@mui/material/Avatar'

interface FriendList{
  open: boolean
  onClose: () => void
  friendList: User[]
  onSelectFriend: (friend: string) => void
}

const FriendListPopup = ({open, onClose, friendList, onSelectFriend}: FriendList) => {
  const theme = useTheme()

  return(
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 6,
          p: 2,
        }
      }}
    >
      <DialogTitle sx={{fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center'}}>
        친구 목록
      </DialogTitle>
      <DialogContent dividers sx={{p: 0}}>
        <List>
          {friendList.map((friend) => (
            <ListItem key={friend.userCd} disablePadding sx={{mb: 0.5}}>
              <ListItemButton
                onClick={() => onSelectFriend(friend.userNm ?? '알 수 없음')}
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  },
                  px: 2,
                  py: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: friend.bgColor, color:friend.textColor}}>
                    {friend.userNm?.[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={friend.userNm}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: '1.1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{borderRadius: 3, px: 3}}
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default FriendListPopup;