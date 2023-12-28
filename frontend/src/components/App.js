import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Components
import Navbar from "./Navbar";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
// Context
import useUserContext from "../hooks/useUserContext";

function App() {
  const { user } = useUserContext();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
