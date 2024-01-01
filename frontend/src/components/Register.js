import React, { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import { Link } from "react-router-dom";
import { serverUrl } from "../setup";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      const data = { username: username, password: password };
      try {
        const response = await fetch(serverUrl + "/auth/register", {
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
    <div className="Register h-full flex flex-col justify-center items-center self-center hover:cursor-default">
      <h2 className="text-center text-3xl mb-2 text-gray-600 font-semibold">
        Register to <span className="text-yellow-400 ">StudyHive</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className={
          "bg-white p-3 m-2 shadow-md rounded max-w-80 w-1/3 min-w-64" +
          (error ? " shadow-red-600/20" : "")
        } // animate-shake is a custom animation defined in index.css
      >
        <label className="block text-gray-600 text-lg ml-2 mb-1">
          Username
        </label>
        <input
          className="block border-2 border-gray-400 p-1 rounded text-lg focus:border-yellow-400 w-full mb-3"
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label className="block text-gray-600 text-lg ml-2 mb-1">
          Password
        </label>
        <input
          className="block border-2 border-gray-400 p-1 rounded text-lg focus:border-yellow-400 w-full mb-3"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="w-full font-semibold bg-yellow-200 p-1 text-lg my-2 text-center text-gray-700 hover:bg-yellow-300 hover:text-gray-800 active:bg-yellow-500 active:text-white shadow active:shadow-none transition-colors rounded"
          type="submit"
        >
          Register
        </button>
      </form>
      <p>
        Already have a account?{" "}
        <Link to="/login" className="text-yellow-500 hover:text-yellow-600">
          Login
        </Link>
      </p>
      {error && (
        <p className="text-pink-700 font-medium text-md tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
}

export default Register;
