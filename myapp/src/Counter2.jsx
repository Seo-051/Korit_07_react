import { useEffect, useState } from "react";

function Counter2() {
  const [ count, setCount ] = useState(0);
  const [ count2, setCount2 ] = useState(0);

  useEffect(() => {console.log('Hello ! Changed the state, count !' )}, [count2, count]);

  return (
    <>
      <p>Counter2 : {count}</p>
      <button onClick={() => setCount(preCount => preCount + 1) }>증가</button>
    </>
  );
}

export default Counter2