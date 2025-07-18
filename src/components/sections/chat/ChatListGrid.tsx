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
      flex: 1.2,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell:(params) => (
        <Stack>
          <Typography
            fontWeight={400}
            color="background.dark"
            sx={{
              fontSize: { xs: '0.8rem', md: '1.1rem' },
              margin: { xs: '0.2rem', md: '10px' },
            }}
          >
            {params.value}
          </Typography>
          <Typography
            variant="body2"
            color="text.main"
            sx = {{
              fontSize: { xs: '0.8rem', md: '1.1rem' },
              margin: { xs: '0.2rem', md: '10px' },
              whiteSpace: 'nowrap',
              overflow:'hidden',
              textOverflow:'ellipsis',
              maxWidth:'100%',
            }}
          >
            {params.row.lastMsg}
          </Typography>
          {
            !params.row.read ? (
              <IconifyIcon
                icon={'mdi:alarm-check'}
                color={"error.main"}
                sx={{
                  fontSize: { xs: '1.0rem', md: '1.5rem' },
                  margin: { xs: '0.2rem', md: '10px' },
                }}
              />
            ) : null
          }
        </Stack>
      )
    },
    {
      field:'time',
      headerName:'전송 시간',
      flex: 0.8,
      minWidth: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell:(params) => (
        <Typography
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.85rem', md: '1.0rem' },
            margin: { xs: '0.2rem', md: '10px' },
          }}
        >
          {params.value}
        </Typography>
      )
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
        <Box sx = {{
          width:'100%',
          height: {
            xs: 600,
            sm: 700,
            md: 700,
            lg: 700,
            xl: 750,
          }
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            hideFooterSelectedRowCount
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            sx={{
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: { xs: '0.7rem', md: '1.1rem' },
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders': {
                borderRight: '1px solid rgba(255,255,255,0.2)',
              },
              '& .MuiDataGrid-footerContainer': {
                minHeight: '0.1rem',
                paddingTop: '1rem',
                paddingBottom: '0.1rem',
              },
              '& .MuiTablePagination-root': {
                fontSize: '0.75rem',
              },
              overflowX: 'auto',
            }}
          />
        </Box>
      </Stack>
    </Paper>
  )
}

export default ChatListGrid;