import { Dialog, DialogActions, DialogContent, DialogTitle, ListItem } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'

interface Friend {
  friendCd: string,
  id: string,
  name: string,
}

interface FriendList{
  open: boolean
  onClose: () => void
  friendList: Friend[]
  onSelectFriend: (friend: string) => void
}

const FriendListPopup = ({open, onClose, friendList, onSelectFriend}: FriendList) => {

  return(
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle> 친구 선택 </DialogTitle>
      <DialogContent dividers>
        <List>
          {friendList.map((friend) => (
            <ListItem key={friend.friendCd} disablePadding>
              <ListItemButton onClick={() => onSelectFriend(friend.name)}>
                <ListItemText primary={friend.name} />
              </ListItemButton>
            </ListItem>
            )
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick = {onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FriendListPopup;