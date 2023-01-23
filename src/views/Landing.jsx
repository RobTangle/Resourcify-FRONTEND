import "./main.style.css";
import React from "react";
import LoginButton from "../components/login-button/LoginButton";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Footer } from "../components/footer/Footer";
export function Landing() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    console.log("RENDERIZANDO MAIN! CAMBIO EN IS LOGGED IN ?");
  }, [isLoggedIn]);

  if (!isLoading && isAuthenticated) {
    // userExist(user, isAuthenticated, navigate, getAccessTokenSilently);
    //! Si el usuario está autenticado, lo envío al Home directamente. //#1
    navigate("/home");
  } else if (!isLoading && !isAuthenticated) {
    return (
      <section className="bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-center md:gap-5  p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div>
            {/* <h1>Resourcify</h1> */}
            <div className="w-80 ml-auto mr-auto mb-3">
              <img src={logo} alt="resourcify logo" />
            </div>
            <div className="flex flex-col gap-5 space-y-4  items-center justify-center md:flex-row  md:center">
              <LoginButton style="text-black " />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

// #1 Al el usuario ir al Home, automáticamente se genera el flujo de Get User y Create User en caso de que no esté registrado en la Data Base.
