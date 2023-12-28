import React, { useState } from "react";
import useUserContext from "../hooks/useUserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (username && password) {
      const data = { username: username, password: password };
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (!response.ok) {
          const { message } = json;
          setError(message);
        } else {
          dispatch({ type: "LOGIN", payload: json });
          setUsername("");
          setPassword("");
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
    <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
