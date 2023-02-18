import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../apis/UserApi";
import { UserContext } from "../contexts/UserContext";

const Register = () => {
  const { profile } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      navigate("/");
    }
  }, [profile]);

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (input.username.trim() === "" && input.password.trim() === "") {
      setError("All fields are required !");
      return false;
    }

    for (const value in input) {
      if (input[value].trim() === "") {
        setError("Please enter your " + value);
        return false;
      }
    }

    const response = await registerApi(input);
    const data = response.data;

    if (!data.success) {
      setError(data.message);
      return false;
    }

    setError(null);

    navigate("/login");
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleInput}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleInput}
      />
      <div className="error-box">
        <p>{error}</p>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
