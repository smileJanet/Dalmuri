import '../../../../style/gomokuboard.css'

/*
* [2차원 배열]
* Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
*
* */

const GomokuBoard = () => {
  const BOARD_SIZE = 15
  const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))

  function handleSetStone(e: React.MouseEvent<HTMLDivElement>) {
    const { rowIndex, colIndex } = e.currentTarget.dataset
    console.log(`row: ${rowIndex}, col: ${colIndex}`)
  }

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
        board.map((_, colIdx) => (
          <div
            key={`${rowIdx}${colIdx}`}
            className='gomoku-cell'
            style={{
              border: '1px solid #8b5e3c',
              boxSizing: 'border-box',
            }}
            onClick={handleSetStone}
            data-row-index={rowIdx}
            data-col-index={colIdx}
          >
          </div>
        ))
      )}
    </div>
  )
}

export default GomokuBoard