import { Route, Routes, useNavigate } from "react-router-dom";
import "../App.css";
import Navigation from "./Navigation";
import Home from "../pages/Home";
import Authentication from "../pages/Authentication";
import Dashboard from "../pages/Dashboard";
import { useAppState } from "../context/reducer";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (!!auth) {
      navigate("/dashboard");
      dispatch({ type: "signup", payload: auth });
    } else {
    }
  }, [navigate, dispatch]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/auth/:form"
          element={<Authentication />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </>
  );
}

export default App;
