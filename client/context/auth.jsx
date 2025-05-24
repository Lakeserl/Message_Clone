import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
import {io} from "socket.io-client"

// VITE_BACKEND_URL = 'http://localhost:5000'

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, useSocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
      }
    } catch (error) {
        toast.error(error.message)
    }
  };

  const connectSocket = (userData) => {
    if(!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
        query: {
            userId: userData._id,
        }
    });
    newSocket.connecte();
    setSocket(newSocket);

    newSocket.on("getOnlineUser")
  }

  useEffect(() => {
    if(token){
        axios.defaults.headers.common["token"] = token;
    }
    checkAuth()
  }, [])
  

  const value = {
    axios,
    authUser,
    onlineUser,
    socket,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
