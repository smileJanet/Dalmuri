import style from '../../../../style/journal/emotionres.module.css'
import happyFlower from '../../../../assets/images/happyflower.png'
import brightFlower from '../../../../assets/images/brightflower.png'
import smileFlower from '../../../../assets/images/smileflower.png'
import calmFlower from '../../../../assets/images/calmflower.png'
import dullFlower from '../../../../assets/images/dullflower.png'
import depressFlower from '../../../../assets/images/depressflower.png'
import sadFlower from '../../../../assets/images/sadflower.png'

type Props = {
  score: number,
  color: string,
}

const EmotionFlower = ({score, color}: Props) => {
  const flowerImg = getFlower(color)

  // score 정규화 (0~1)
  const normalizedScore = score / 100;

  // 배경 밝기: score 낮으면 회색, 높으면 흰색
  const brightness = Math.floor(200 + (normalizedScore * 55)); // 200~255
  const bgColor = `rgb(${brightness}, ${brightness}, ${brightness})`;

  // 감정색 투명도: score 높을수록 진하게
  const colorOpacity = Math.floor(5 + (normalizedScore * 25)).toString(16).padStart(2, '0'); // 05~1E

  function getFlower(color: string) {
    switch (true) {
      case color === '#4B3F72': return sadFlower;
      case color === '#517EA6': return depressFlower;
      case color === '#7BAACD': return dullFlower;
      case color === '#A9D6C8': return calmFlower;
      case color === '#F3E99F': return smileFlower;
      case color === '#FF9E80': return brightFlower;
      case color === '#F9A1A0': return happyFlower;
    }
  }

  return (
    <div
      className={`${style['emotion-flower']}`}
      style={{
        background: `radial-gradient(circle, ${bgColor} 35%, ${color}${colorOpacity} 60%, transparent 70%)`
      }}
    >
      <img src={flowerImg} alt="flower" />
    </div>
  )
}

export default EmotionFlower