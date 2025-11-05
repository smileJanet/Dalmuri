import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import { useState } from 'react'
import IconifyIcon from 'components/base/IconifyIcon.tsx'
import { useNavigate } from 'react-router-dom'

const MinigameWidget = () => {
  /*
  * [절대 경로와 상대 경로]
  *
  * 1. 절대 경로
  * navigate('/example/1') : 특문(/)으로 시작되는 방식
  * ** 파일의 root부터**, 해당 파일까지 전체 경로(URL)을 의미
  * ex. localhost:1003/example/1 -> localhost 바로 뒤에 붙음
  *
  * 2. 상대 경로
  * navigate('example/1') : 문자로 시작되는 방식
  * **현재 파일의 위치를 기준**으로, 연결하려는 파일의 상대적인 경로를 작성
  * ex. 현재 URL : http://localhost:3000/minigame
  * navigate('example/1')을 작성한다면 -> http://localhost:3000/minigame/example/1
  * navigate('../example/1')을 작성한다면 -> http://localhost:3000/example/1
  *
  * [알아야 하는 기호]
  * / : root, localhost 바로 뒤에 붙음
  * ./ : 현재 위치
  * ../ : 상위 폴더로 이동
  *
  * */
  const navigate = useNavigate()

  const handleRowClick = (params: GridRowParams) => {
    navigate(`mini-game/${params.row.id}`)
  }

  const minigameMenus = [
    {
      id: 'Lottery',
      icon: 'mingcute:random-line',
      color: '#c38df9',
      name: '로또 번호 추천 받기',
      path: 'loterry',
    },
    {
      id: 'DrawLots',
      icon: 'mingcute:vip-2-line',
      color: '#3ECB91',
      name: '제비 뽑기',
      path: 'draw-lots',
    },
    {
      id: 'Gomoku',
      icon: 'mdi:gamepad-circle-right',
      color : '#FFFFFF',
      name : '오목',
      path: 'gomoku',
    },
    {
      id: 'AnswerNoelly',
      icon: 'mingcute:ai-line',
      color: '#1589e5',
      name: '대답해주는 노엘리',
      path: 'answer-noelly',
    },
  ]

  const [rows] = useState(minigameMenus)

  const columns: GridColDef[] = [
    {
      field: 'id',
      flex: 0.1,
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
          onRowClick={handleRowClick}
          sx={{
            width: '100%',
            '& .MuiDataGrid-cell': {
              fontSize: '1.05rem',
            },
        }}
        />
      </Stack>
    </Paper>
  )
}

export default MinigameWidget