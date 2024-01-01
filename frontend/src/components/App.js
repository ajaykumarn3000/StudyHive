import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Components
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
// Context
import useUserContext from "../hooks/useUserContext";

function App() {
  const { user } = useUserContext();
  console.log("USERCONTEXT:", user);
  return (
    <div className="App h-dvh bg-gray-100">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
