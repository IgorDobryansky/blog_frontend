import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useAppState } from "../context/reducer";

import axios from "axios";

export default function Authentication() {
  const navigate = useNavigate();
  const { form: type } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    setFormData({
      username: "",
      password: ""
    });
  }, [type]);

  const { dispatch } = useAppState();

  function updateFormData(event) {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  async function submit(event) {
    event.preventDefault();
    const res = await axios.post(
      `http://127.0.0.1:3001/${type === "signup" ? "users" : "login"}`,
      formData
    );
    console.log(res);
    if (res.data.token) {
      dispatch({ type: "signup", payload: res.data });
      localStorage.setItem("auth", JSON.stringify(res.data));
      return navigate("/dashboard");
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={updateFormData}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={updateFormData}
      />
      <button type="submit">{type}</button>
    </form>
  );
}
