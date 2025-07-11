import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconifyIcon from 'components/base/IconifyIcon'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const ChatListGrid = () => {
  const chatRooms = [
    {
    id: 1,
    name: '킴주영',
    lastMsg: '내일 어디서 만나 우리',
    time: '4:20 pm',
    read: true,
    },
    {
      id: 2,
      name: '김부꾸',
      lastMsg: '인생은 아잉뿌잉뿌잉><',
      time: '4:35 pm',
      read: false,
    },
  ]

  const [rows] = useState(chatRooms)

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '채팅방',
      flex:1.5,
      renderCell:(params) => (
        <Stack>
          <Typography
            fontWeight={400}
            fontSize="1.1rem"
            margin="10px"
            color="background.dark"
          >
            {params.value}
          </Typography>
          <Typography
            variant="body2"
            color="text.main"
            margin="10px"
            fontSize="1.1rem"
            sx = {{
              whiteSpace: 'nowrap',
              overflow:'hidden',
              textOverflow:'ellipsis',
              maxWidth:'100%',
            }}
          >
            {params.row.lastMsg}
          </Typography>
        </Stack>
      )
    },
    {
      field:'time',
      headerName:'최근 메시지 시간',
      flex:1,
      renderCell:(params) => (
        <Typography
          color="text.secondary"
          fontSize="1.0rem"
          margin="10px"
        >
          {params.value}
        </Typography>
      )
    },
    {
      field:'read',
      headerName:'읽음 여부',
      flex:1,
      renderCell: (params) =>
        !params.value ? (
        <IconifyIcon
          icon={'mdi:alarm-check'}
          color="error.main"
          style={{
            fontSize: 25,
            margin:10,
          }}
        />
      ) : null
    },
  ]

  return (
    <Paper elevation={3} sx={{p:2, height:'100%', width: '100%'}}>
    {/* 검색창 */}
      <TextField
        variant="outlined"
        fullWidth
        placeholder="검색 Search for..."
        size="medium"
        sx = {{
          mb:2,
        }}
        InputProps = {{
          startAdornment: (
            <InputAdornment position="start">
              <IconifyIcon icon={'mingcute:search-line'} />
            </InputAdornment>
          )
        }}
      />

    {/* 채팅방 리스트 */}
      <Stack spacing={1}>
        <Box sx = {{height:400, width:'100%'}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            hideFooterSelectedRowCount
            disableRowSelectionOnClick
            disableColumnMenu
            rowHeight={50}
            sx={{
              '& .MuiDataGrid-columnHeaderTitle':{
                fontSize:'1.1rem',
                }
            }}
          />
        </Box>
      </Stack>
    </Paper>
  )
}

export default ChatListGrid;