import { useState } from "react";

function MyComponent2() {
  const [ name, setName ] = useState({
    firstName : 'John',
    lastName: 'Doe'
  });

  return (
    <>
      <h2>Hello {name.firstName} {name.lastName}</h2>
    </>
  );
}

export default MyComponent2