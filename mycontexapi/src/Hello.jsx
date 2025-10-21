import React from 'react'
import AuthContext from "./AuthContext";

function Hello() {
  const authContext = React.useContext(AuthContext);

  return(
    <>
      안녕하세요, {authContext}
    </>
  );
}

export default Hello