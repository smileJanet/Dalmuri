import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import IconifyIcon from 'components/base/IconifyIcon.tsx'

const MinigameWidget = () => {
  const minigameMenus = [
    {
      id: 1,
      icon: 'mingcute:random-line',
      color: '#c38df9',
      name: '로또 번호 추천 받기'
    },
    {
      id: 2,
      icon: 'mingcute:vip-2-line',
      color: '#3ECB91',
      name: '제비 뽑기'
    },
    {
      id: 3,
      icon: 'mingcute:ai-line',
      color: '#1589e5',
      name: '대답해주는 노엘리'
    },
  ]

  const [rows] = useState(minigameMenus)

  const columns: GridColDef[] = [
    {
      field: 'id',
      flex: 0.1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconifyIcon
          icon={params.row.icon}
          color={params.row.color}
          sx={{
            fontSize: { xs: '1.0 rem', md: '1.5rem' },
            margin: { xs: '0.2rem', md:'10px' },
          }}
        />
      )
    },
    {
      field: 'name',
      flex: 0.5,
      minWidth: 500,
      align: 'center',
      headerAlign: 'center',
    }
  ]

  return (
    <Paper
      sx={{height:400}}
    >
      <div>
        미니 게임
      </div>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%'}}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooterSelectedRowCount
          disableColumnMenu
          disableColumnResize
          hideFooter
          columnHeaderHeight={0}
        />
      </Stack>
    </Paper>
  )
}

export default MinigameWidget