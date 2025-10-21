import HelloProps from "./types/types";

function ByeComponent({name} : HelloProps) {

  return (
    <>
      <h1>Bye {name} !</h1>    
    </>
  );
}

export default ByeComponent