import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { setChats } from "./slices/chatsSlice";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import api from "./axios/axiosInstance";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const fetchInitialData = async () => {
    try {
      await api.get("auth/user").then((response) => {
        setUser(response.data.user);
      });
      await api.get("/chat/list").then((res) => {
        dispatch(setChats(res.data));
      });
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get("/chat/list");
        dispatch(setChats(res.data));
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={user ? <Navigate to="/" /> : <Auth setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

export default App;
