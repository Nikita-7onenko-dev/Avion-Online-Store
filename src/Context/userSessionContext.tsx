import { createContext, useContext, useEffect, useRef, useState } from "react";
import {jwtDecode} from 'jwt-decode';

type User = {
  _id: string;
  email: string;
  username: string;
  phone?: string;
  isActivated: boolean;
  role: "User" | "Admin";
  accessToken: string;

  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
}

type LoginUserType = {
  email: string;
  password: string;
}

type RegisterUserType = LoginUserType & {
  username: string;
  phone?: string;
}

type JWTPayload = {
  exp: number;
  iat: number;
  sub: string; 
}

type UserSessionContextType = {
  userData: User | null;
  // refreshTimerIdRef: React.RefObject<NodeJS.Timeout | null>;
  postUser: (userData: LoginUserType | RegisterUserType) => Promise<null | User>;
  logout: () => void;
  isLoading: boolean;
}

const UserDataContext = createContext<null | UserSessionContextType>(null);

// Раздаем контекст
export function useUserSessionContext():UserSessionContextType  {
  const userSessionContext = useContext(UserDataContext);
  if(!userSessionContext) throw new Error('useUserSessionContext must be used inside provider');
  return userSessionContext;
}

export function UserSessionContextProvider({children}: {children: React.ReactNode} ): React.JSX.Element {

  const [userData, setUserData] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshTimerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Инициализация сессии
    async function initFetchRefreshUserData() {
      try{
        const userData = await fetchRefreshUserData();
        console.log(userData)
        if(userData) {
          // Парсим JWT
          const payload = jwtDecode<JWTPayload>(userData.accessToken);
          const now = Date.now() / 1000;
          const ttl = Math.max((payload.exp - now - 60) * 1000, 0);
          // Ставим рефреш на таймаут
          refreshTimerIdRef.current = setTimeout(initFetchRefreshUserData, ttl);
          // Устанавливаем данные пользователя
          setUserData(userData);
        }
      } catch(err) {
        console.log(err);
        refreshTimerIdRef.current = setTimeout(initFetchRefreshUserData, 30 * 1000);
      }
    }

    initFetchRefreshUserData();

    return () => {
      if(refreshTimerIdRef.current) {
        clearTimeout(refreshTimerIdRef.current)
      }
    }

  }, []);

  // Запрос на обновление токенов 
  async function fetchRefreshUserData(): Promise<User | null> {
    setIsLoading(true)
    const url = process.env.API_URL + 'refresh/' || "https://avion-online-store-server.onrender.com/api/refresh/";
    try{
      const response = await fetch(url, {
        credentials: 'include'
      });

      if(response.ok){
        const userData: User = await response.json();
        return userData;
      }

    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }

    return null;
  }

  async function logout() {
    setIsLoading(true);
    const url = process.env.API_URL + 'logout/' || "https://avion-online-store-server.onrender.com/api/logout/";

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if(response.ok) {
        // Снимаем рефреш с таймаута
        if(refreshTimerIdRef.current) {
          clearTimeout(refreshTimerIdRef.current);
        }
        // Удаляем данные пользователя
        setUserData(null);

      }
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }

  // Запрос на логин или регистрацию
  async function postUser(userData: LoginUserType | RegisterUserType): Promise<User | null> {
    setIsLoading(true);
    let url;

    if("username" in userData) {
      url = process.env.API_URL + 'register/' || "https://avion-online-store-server.onrender.com/api/register/";
    } else {
      url = process.env.API_URL + 'login/' || "https://avion-online-store-server.onrender.com/api/login/";
    }
    console.log(url)
    try{
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(response.ok) {
        const userData: User = await response.json();
        setUserData(userData)
      }
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
    return null;

  }

  return (
    <UserDataContext.Provider value={{userData, isLoading, postUser, logout}}>
      {children}
    </UserDataContext.Provider>
  )
}
