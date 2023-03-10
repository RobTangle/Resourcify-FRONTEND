import React from "react";
import { useState } from "react";
import { NAME_ACCESS_TOKEN } from "../../helpers/constants";
import LoginButton from "../login-button/LoginButton";
import LogoutButton from "../logout-button/LogoutButton";

export function Navbar({ isLoggedIn }) {
  const [token, setToken] = useState(false);

  React.useEffect(() => {
    if (!token) {
      // console.log("primer useEffect. !token");
      setToken(localStorage.getItem(NAME_ACCESS_TOKEN));
    }
  }, []);

  React.useEffect(() => {
    // console.log("Navbar renderizada. useEffect");
  }, [token]);

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </div>
  );
}
