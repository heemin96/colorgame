import React, { memo } from "react";
import styled from "@emotion/styled";


//전체 크기
const BoardContainer = styled.div`
  width: 360px;
  height: 360px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  
`;

//getLength를 통해 아이템 크기 지정
const BoardItem = styled.div`
  width: ${(props) => props.len}px;
  height: ${(props) => props.len}px;
  background-color: ${(props) => props.backColor};
  margin : 2px;
`;

//stage에 따라서  item 크기 변화 주는 컴포넌트
const getLength = (stage) => {
    const divide = Math.floor(((stage+1)/2) + 1); //stage 1 --> 2  | stage 2 --> floor(2.5) =2 | stage 3 --> 3  ..... 
    const rst = (360 / divide) - 4; //stage 1 --> 176  | stage 2 --> 176 | stage 3 --> 116  ..... 
    
    return rst;
};



function Board ({answer,answerColor, baseColor, stage, onSelect, itemList,}) {
  
  const len = getLength(stage);

  return (
  <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
    <BoardContainer>
        {
            itemList.map((item)=> (
                <BoardItem 
                    key={item}
                    len={len}
                    onClick={()=> onSelect(item)}
                    backColor={item === answer ? answerColor : baseColor}
                />
            ))
        }
    </BoardContainer>
  </div>
  );
};

export default Board;