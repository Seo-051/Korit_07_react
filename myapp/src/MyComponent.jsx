import {useState} from 'react';

function MyComponent() {
  const [firstName, setFirstName] = useState('일');
  return (
    <h1>
      Hello {firstName}
    </h1>
  );
}

export default MyComponent