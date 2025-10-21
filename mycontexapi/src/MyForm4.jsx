import { useState } from "react";

function MyForm4() {
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');

  // 근데 잘 생각해보면 alert을 띄우는건 학습 상황이라서 그렇지 실제 얘가 하는 역할은 form 태그의 preventDefault()를 쓰기 위해서에 가깝습니다.
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName} ${lastName}`);
    event.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>first name : </label>
      <input type="text" onChange={e => setFirstName(e.target.value)}/>
      <br />
      <label>last name : </label>
      <input type="text" onChange={e => setLastName(e.target.value)}/>
      <br />
      <label>email : </label>
      <input type="email" onChange={e => setEmail(e.target.value)}/>
      <br />
      <input type="submit" value='제출💌'/>
    </form>
  );
}

export default MyForm4