import { LoginUserType, RegisterUserType, UserDtoType, UserDataType } from "@/types/UserSessionTypes";
import { tokenService } from "./TokenService";
import { ApiError, errorCather, handleResponseError } from "@/exceptions/ApiError";

class UserSessionService {

  isAuthorized: boolean = true;
  baseUrl: string = process.env.API_URL || "https://avion-online-store-server.onrender.com/api/";
  timeToRefresh: number | null = null;
  refreshTimerId: NodeJS.Timeout | null = null;

  setTokenAndRefreshTimer(accessToken: string): void {
    this.timeToRefresh = tokenService.setSession(accessToken);
    // if(this.refreshTimerId) clearTimeout(this.refreshTimerId);
    // this.refreshTimerId = setTimeout(() => this.fetchRefreshUserData(), this.timeToRefresh - (1000 * 30));
  }

  clearTokenAndRefreshTimer(): void {
    tokenService.clear()
    this.timeToRefresh = null;
    if(this.refreshTimerId) clearTimeout(this.refreshTimerId);
  }
  
  // Запрос на обновление токенов 
  async fetchRefreshUserData(): Promise<UserDataType | null> {
    const url = this.baseUrl + "refresh/";
    try{
      if(!this.isAuthorized) return null;

      const response = await fetch(url, {
        credentials: 'include'
      });

      if(response.ok){
        const userDTO: UserDtoType = await response.json();
        const { accessToken, ...userData } = userDTO;
        this.setTokenAndRefreshTimer(accessToken);
        this.isAuthorized = true;
        
        return userData;
      } else if (response.status === 401) {
        this.isAuthorized = false;
        throw new ApiError('server', 'Unauthorized error');
      } else {
        handleResponseError(response.status);
      }
    } catch(err) {
      errorCather(err);
    }
  }

  // Запрос на логин или регистрацию
  async postUser(userData: LoginUserType | RegisterUserType): Promise<UserDataType> {
    let url;
    let isRegister;

    if("username" in userData) {
      url = this.baseUrl + "register/";
      isRegister = true;
    } else {
      url = this.baseUrl + "login/";
      isRegister = false;
    }
    
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
        const userDto: UserDtoType = await response.json();
        const { accessToken, ...userData } = userDto;
        this.setTokenAndRefreshTimer(accessToken);
        this.isAuthorized = true;

        return userData;

      } else if(response.status === 400) {
        const message = isRegister ? 'This email is already registered' : 'Invalid email or password';
        throw new ApiError('server', message);
      } else {
        handleResponseError(response.status);
      }
    } catch(err) {
      errorCather(err);
    }
  }

  async logout(): Promise<null> {
    const url = this.baseUrl + "logout/";

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if(response.ok) {
        this.clearTokenAndRefreshTimer();
        this.isAuthorized = false;
        return null;
      } else if(response.status === 400) {
        throw new ApiError('server', 'There is no active session');
      } else {
        handleResponseError(response.status);
      }

    } catch(err) {
      errorCather(err)
    }
  }

  async updateUser(newUserData: Partial<UserDataType>): Promise<UserDataType> {

    const url = this.baseUrl + "updateUser/";

    try{
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenService.getToken()}`
        },
      })

      if(response.ok) {
        const userDto: UserDtoType = await response.json();
        const { accessToken, ...userData } = userDto;
        this.setTokenAndRefreshTimer(accessToken);

        return userData;

      } else if(response.status === 401 && this.isAuthorized) {
        await this.fetchRefreshUserData();
        return this.updateUser(newUserData);

      } else {
        handleResponseError(response.status);
      }
    } catch(err) {
      errorCather(err);
    }
  }

}

export const userSessionService = new UserSessionService();