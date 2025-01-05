// rafce
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  // Javascript

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
