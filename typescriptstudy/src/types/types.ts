type HelloProps = {
  name: string;     // 얘네는 Java에서의 field처럼 느껴집니다.
  age?: number;
  fn?: () => void;   // 얘는 그러면 Java에서의 method처럼 보이면 좋겠네요.
  fn2?: (msg: string) => void;  // 얘는 매개변수로 string dat를 받고 return 타입이 없네요.
}

export default HelloProps

// 여기 내에 모든 type들을 다 모아두는 편입니다.