// src/components/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Import the login function from api.ts

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Imagine a login function that returns a token
      const { token } = await loginUser(username, password);

      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Redirect to the dashboard after successful login
      navigate("/");
    } catch (err: unknown) {
      setError("Login failed, please try again.");
      // Optionally, you can log the error to the console for debugging
      console.error("Error logging in:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
