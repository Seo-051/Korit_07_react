import HelloProps from "./types/types.ts";

function HelloComponent({name, age} : HelloProps) { 
	return (
    <>
      Hello, {name}, you are {age} years old!
    </>
  );
}

export default HelloComponent