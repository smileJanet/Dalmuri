import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import fillbin from 'assets/images/fillbin.png'
import bingif from 'assets/images/bingif.gif'
import style from '../../../../style/community/trashbin.module.css'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'

const EmotionTrash = () => {
  const [trash, setTrash] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [isThrow, setIsThrow] = useState<boolean>(false)

  useEffect(() => {
    const savedCnt = localStorage.getItem('trash')
    if (savedCnt) setCount(Number(savedCnt))
  }, [])

  function throwAway () {
    const newCnt = count + 1

    setIsThrow(true)
    setCount(newCnt)
    localStorage.setItem('trash', String(newCnt))

    setTimeout(() => {
      setTrash('')
      setIsThrow(false)
    }, 3000)

  }

 return (
   <Paper
      sx={{
        width: '100%',
        height: 'auto',
      }}
   >
     <div>감정 쓰레기통</div>
     <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
        }}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
     >
       <Box
         className={style['bin-cute-screen']}
          sx={{
            width: '100%',
            height: 300,
            p: 2,
            margin: '2px',
          }}
       >
         <div className={style['bin-container']}>
           {!isThrow ? (
             <>
               <img
                 className={`${style['bin-img']} ${!isThrow ? style['visible'] : ''}`}
                 src={fillbin}
                 style={{
                   width: '30%',
                   height: '30%',
                   objectFit: 'contain',
                 }}
                 alt="fillbin"
               />
               <div className={style['bin-text']}>
                 지금까지 {count}명이나 버렸어요. <br/>
                 다른 사람에게 상처주지 않는 모습, 너무 멋져요!
               </div>
             </>
             ) : (
               <>
                 <img
                   className={`${style['bin-img']} ${isThrow ? style['visible'] : ''}`}
                   src={bingif}
                   alt="throwingbin"
                 />
                 <div className={style['bin-text']}>
                   쓰레기를 버리고 있어요...
                 </div>
               </>
           )}
         </div>
       </Box>
       <Box
         className={style['handheld-console-box']}
         sx={{
           width: '100%',
           height: 300,
           p: 2,
           display: 'flex',
           justifyContent:'center',
           alignItems: 'center',
           flexDirection: 'column',
         }}
       >
         <textarea
           className={style['bin-textarea']}
           value={trash}
           onChange={(e) => setTrash(e.target.value)}
         />
         <Button
           className={style['bin-button']}
           variant="outlined"
           onClick={throwAway}
         >
           버리기!
         </Button>
       </Box>
     </Stack>
   </Paper>
 )
}

export default EmotionTrash