import "./main.style.css";
import React from "react";
import LoginButton from "../components/login-button/LoginButton";
import { NewResource } from "../components/newResource/NewResource";
import { Navbar } from "../components/navbar/Navbar";
import { MyResources } from "../components/myResources/MyResources";
import { userExist } from "../helpers/check-user";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  React.useEffect(() => {
    console.log("RENDERIZANDO MAIN! CAMBIO EN IS LOGGED IN ?");
  }, [isLoggedIn]);

  if (!isLoading && isAuthenticated) {
    userExist(user, isAuthenticated, navigate, getAccessTokenSilently);
  } else if (!isLoading && !isAuthenticated) {
    return (
      <section className="bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-center md:gap-5  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div>
            <h1>Resourcify</h1>
            <div className="flex flex-col gap-5 space-y-4  items-center justify-center md:flex-row  md:justify-start">
              <LoginButton style="text-black " />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
