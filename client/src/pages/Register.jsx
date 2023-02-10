import React, { useState } from "react";
import registerApi from "../apis/UserApi";

const Register = () => {
  const [input, setInput] = useState({
    username: "sanjaya7",
    password: "sanjaya7",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerApi(input);
    console.log(response);
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
