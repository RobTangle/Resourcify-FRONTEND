import Swal from "sweetalert2";
import { URL } from "./URLs";
import axios from "axios";

export const signInFormMX = (setToken, setIsLoggedIn) =>
  Swal.mixin({
    title: "Sign In",
    html:
      '<input id="email" type="email" class="swal2-input">' +
      '<input id="password" type="password" class="swal2-input">',
    focusConfirm: false,
    preConfirm: async () => {
      const userInputs = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      try {
        console.log("USER INPUTS = ", userInputs);
        const response = await axios.post(URL + "/auth/signin", userInputs);
        if (response.status === 200) {
          localStorage.setItem(
            "access_token_bookmarks",
            response.data?.access_token
          );
          setToken(response.data?.access_token);
          setIsLoggedIn(true);
          Swal.fire({
            title: "Welcome!",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          text: error?.message,
          icon: "error",
        });
      }
    },
  });

export const signUpFormMX = Swal.mixin({
  title: "Sign Up",
  html:
    '<input id="email" type="email" class="swal2-input">' +
    '<input id="password" type="password" class="swal2-input">' +
    '<input id="firstName" type="text" class="swal2-input">' +
    '<input id="lastName" type="text" class="swal2-input">',
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonText: "Sign up",
  showLoaderOnConfirm: true,
  preConfirm: async () => {
    const userInputs = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
    };
    console.log("USER INPUTS = ", userInputs);
    try {
      const response = await axios.post(URL + "/auth/signup", userInputs);
      if (response.status === 201) {
        Swal.fire({
          title: "You've been registered!",
          text: "Sign in with your email and password.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: error?.message,
        icon: "error",
      });
    }
  },
});

export const SwalErrorMX = (error) =>
  Swal.mixin({
    title: "Oops! Something went wrong! 😬",
    text: error?.response?.data?.message?.[0] || error.message,
    icon: "error",
  });

export const SwalSuccessMX = (titleText) =>
  Swal.mixin({
    title: titleText,
    icon: "success",
    position: "center",
    showConfirmButton: true,
    timer: 3000,
    timerProgressBar: true,
  });

export const ToastSuccessMX = (titleText) =>
  Swal.mixin({
    toast: true,
    title: titleText,
    position: "top-end",
    icon: "success",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

export const ToastErrorMX = (error) =>
  Swal.mixin({
    toast: true,
    title: error?.response?.data?.message?.[0] || error.message,
    position: "top-end",
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
