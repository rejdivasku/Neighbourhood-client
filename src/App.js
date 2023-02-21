import { Route, Routes } from 'react-router-dom';
import { Home } from "./pages/home/Home";
import './App.css';
import { useNavigate } from "react-router-dom";
import { Register } from './pages/register/Register';
import { NavbarElement } from './components/navbar/Navbar';
import { Login } from './pages/login/Login';
import { AdministrativeUnit } from './pages/administrativeUnit/AdministrativeUnit';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <NavbarElement logout={logout}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/administrative-unit/:id' element={<AdministrativeUnit />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
