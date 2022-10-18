import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";

//rgb 색 지정 
const BaseColor = () => {
  const ran1 = Math.ceil(Math.random() * 255 + 1);  // (0~0.99) x 255 + 1 을 통해 rgb값 최대 256 나오게 
  const ran2 = Math.ceil(Math.random() * 255 + 1);  
  const ran3 = Math.ceil(Math.random() * 255 + 1);

  return `rgb(${ran1}, ${ran2}, ${ran3})`;
}


const randomColor = (ranNum, baseNum) => {   
  const flag = Math.round(Math.random()); 
  console.log('flag  : ', flag)
  if(flag === 1){
    return baseNum + ranNum;  
  }else{
    return baseNum - ranNum;  
    
  }
}

const AnswerColor = (stage, baseColor)=> {
  const randomcolorArr = baseColor.slice(4,-1).split(','); // baseColor로 넘어온 값이 rgb(ran1, ran2, ran3) .slice.split--> colorArr = [ran1,ran2,ran3]
  console.log(baseColor)
  
  const num = Math.floor(Math.random() * (100-stage)+10); // ex) stage 1  --> (0.1x99) + 10  num = 19
                                                          //     stage 30 --> (0.1x70) + 10  num = 17                                        
  const ran1 = randomColor(num, parseInt(randomcolorArr[0]));   // ran1 = randomColor(19,pareseInt(colorArr[0])); --> (19, ran1) 
  const ran2 = randomColor(num, parseInt(randomcolorArr[1])); 
  const ran3 = randomColor(num, parseInt(randomcolorArr[2]));

  console.log('num : ', num);
  console.log('randomColor1 : ', ran1);
  console.log('randomColor2 : ', ran2);
  console.log('randomColor3 : ', ran3);

  return `rgb(${ran1}, ${ran2}, ${ran3})`;
  
}


const App = () => {
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);
  const [time, setTime] = useState(15);
  const [answer, setAnswer] = useState();
  const [answerColor, setAnswerColor] = useState();
  const [baseColor, setBaseColor] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [itemList, setItemList] = useState([]);

  //useCallback 메모리제이션된 함수를 반환한다
  const onSelect = useCallback((ok) => {
    if (ok === answer) {
      // 정답일 때 
      const newScore = score+(stage * stage * time);
      const newStage = stage + 1;
      setScore(newScore);
      setStage(newStage);
      setTime(15);
    } else {
      // 아닐 때
      if (time > 3) {
        setTime(time - 3);
      } else {
        setTime(0);
      }
    }
  },[time, itemList]);

  // 정답 맞추면 호출됨
  useEffect(() => {
    setIsPlaying(true);
    
    // borad item 갯수
    const boardCnt = Math.pow(Math.floor((stage + 1) / 2 + 1), 2); //stage 1 --> 4 

    // 0 ~ itme갯수 -1 사이의 숫자 중에서 난수 생성 -> answer 값으로 사용 
    const ans = Math.floor(Math.random() * boardCnt); // stage 1--> (0~0.99) x 4  
    setAnswer(ans);
    const baseColor = BaseColor();
    const getAnsColor = AnswerColor(stage, baseColor);
    setAnswerColor(getAnsColor);
    setBaseColor(baseColor);
    const tmpList = [];

    for (let i = 0; i < boardCnt; i++) {
      tmpList.push(i);
    }
    setItemList(tmpList);
  }, [stage, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      let timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      
      if (time <= 0) {
        clearInterval(timer);
        setTimeout(() => {
          setTime(15);
          alert(`GAME OVER! \n스테이지 : ${stage}, 점수 : ${score}` );
          setStage(1);
          setScore(0);
          setIsPlaying(false);
        }, 1000);
      }
      return () => clearInterval(timer);
    }
  }, [time, isPlaying]);

  return (
    <div className="body">
      <Header
        score={score}
        stage={stage}
        time={time}
      />

      <Board
        itemList={itemList}
        answer={answer}
        answerColor={answerColor}
        baseColor={baseColor}
        onSelect={onSelect}
        stage={stage}
      />
    </div>
  );
};

export default App;