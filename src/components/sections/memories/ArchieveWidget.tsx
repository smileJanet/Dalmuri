import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import IconifyIcon from 'components/base/IconifyIcon.tsx'

const ArchieveWidget = () => {
  const archieveMenus = [
    {
      id: 1,
      icon: 'mingcute:hand-heart-fill',
      color: '#F8626E',
      name: '좋아요 바로가기',
    },
    {
      id: 2,
      icon: 'mingcute:bookmark-fill',
      color: '#FFE566',
      name: '북마크 바로가기',
    }
  ]
  const [rows] = useState(archieveMenus)

  const columns: GridColDef[] = [
    {
      field:'id',
      flex: 0.1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <IconifyIcon
          icon= {params.row.icon}
          color= {params.row.color}
          sx={{
            fontSize: { xs: '1.0rem', md: '1.5rem' },
            margin: { xs: '0.2rem', md: '10px' },
          }}
        />
      )
    },
    {
      field:'name',
      flex: 0.5,
      minWidth: 500,
      align: 'center',
      headerAlign: 'center',
    }
  ]

  return(
    <Paper
      sx={{height:400}}
    >
      <div>
        아카이브
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

export default ArchieveWidget