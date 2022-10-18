import React from "react";


function Header({score,stage,time}){

  return(
    <div style={{display:"flex",justifyContent:"center",marginTop:"200px"}}>  
      스테이지: {stage}, 남은 시간: {time}, 점수: {score}
    </div>
  )
}


export default Header;
