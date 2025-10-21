import { useState, useEffect } from "react";

function Counter3() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Hello from useEffect !');
    return () => {
      console.log('clean up function 정리 함수');
    }

  }, [count]);

  return (
    <>
        <p>Counter3 : {count}</p>
        <button onClick={() => {
          console.log('값이 바뀌었습니다');
          setCount(preCount => preCount + 1)} }>증가</button>
    </>
  );
}

export default Counter3