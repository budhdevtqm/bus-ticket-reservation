import React, { Fragment, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [mode, setMode] = useState(true);
  const modeHandler = () => setMode(!mode);

  return (
    <Fragment>
      {mode ? (
        <Login mode={mode} modeHandler={modeHandler} />
      ) : (
        <Signup mode={mode} modeHandler={modeHandler} />
      )}
    </Fragment>
  );
};

export default Auth;
