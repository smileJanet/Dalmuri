import '../../../../style/gomokuboard.css'
import { GomokuBoardProps } from 'components/sections/journal/mini-game/Gomoku.tsx'

/*
* [2차원 배열]
* Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
*
* */

const GomokuBoard = ({stone, placeStone}:GomokuBoardProps) => {
  const BOARD_SIZE = 15
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))

  return (
    <div className="gomoku-board" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
      gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
      width: '90vmin',
      height: '90vmin',
      maxWidth: '600px',
      maxHeight: '600px',
      border: '2px solid #8b5e3c',
      margin: '10px auto',
      backgroundColor: '#deb887',
    }}>
      {board.map((_, rowIdx) =>
        board.map((_, colIdx) => {
          const _stone = stone.find(s => s.x === colIdx && s.y === rowIdx)
          return (
            <div
              key={`${rowIdx}${colIdx}`}
              className='gomoku-cell'
              style={{
                border: '1px solid #8b5e3c',
                boxSizing: 'border-box',
                display: 'flex',          
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => placeStone(colIdx, rowIdx)}
            >
              {
                _stone && (
                  <div
                    style={{
                      width: '80%',
                      height: '80%',
                      borderRadius: '50%',
                      backgroundColor: _stone.color
                    }}
                  ></div>
                )
              }
            </div>
          )
        })
      )}
    </div>
  )
}

export default GomokuBoard