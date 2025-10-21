function MyComponent2() {
  // 버튼을 눌렀을 때 호출되는 함수를 하나 정의하겠습니다.
  const handleClick = () => {
    alert('Button pressed !');
  }

  return (
    <>
      <button onClick={handleClick}>Press Me !</button>
    </>
  );
}

export default MyComponent2