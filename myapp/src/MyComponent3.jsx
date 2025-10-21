import { useState } from "react";

function MyComponent3() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment = () => {
    setCount1(count1 + 1);  // 얘가 먼저 호출될거니까 얘의 상태가 바뀔 때 리렌더링이 일어나야하지 않는가
    setCount2(count2 + 1);  // 사실은 얘까지 호출되고 나서 렌더링은 한 번만 일어난다.
  } 

  return (
    <>
      <p> 현재 값 : {count1} ⭐ {count2} </p>  
      <button onClick={increment}> 증가 </button>  
    </>
  );
}

export default MyComponent3