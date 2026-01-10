import { LoginUserType, RegisterUserType, UserDtoType, UserDataType } from "@/types/UserSessionTypes";
import { tokenService } from "./TokenService";


class UserSessionService {

  isAuthorized: boolean = true;
  baseUrl: string = process.env.API_URL || "https://avion-online-store-server.onrender.com/api/";
  timeToRefresh: number | null = null;
  refreshTimerId: NodeJS.Timeout | null = null;

  setTokenAndRefreshTimer(accessToken: string): void {
    this.timeToRefresh = tokenService.setSession(accessToken);
    if(this.refreshTimerId) clearTimeout(this.refreshTimerId);
    this.refreshTimerId = setTimeout(() => this.fetchRefreshUserData, this.timeToRefresh - (1000 * 30));
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
      }

    } catch(err) {
      console.log(err);
      throw err;
    }

    return null;
  }

  // Запрос на логин или регистрацию
  async postUser(userData: LoginUserType | RegisterUserType): Promise<UserDataType | null> {
    let url;

    if("username" in userData) {
      url = this.baseUrl + "register/";
    } else {
      url = this.baseUrl + "login/";
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
      }
    } catch(err) {
      console.log(err);
      throw err;
    } 
    return null;
  }

  async logout(): Promise<null | void> {
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
      }

    } catch(err) {
      console.log(err);
      throw(err)
    }
  }

  async updateUser(newUserData: Partial<UserDataType>): Promise<UserDataType | null> {

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
        this.updateUser(newUserData);
      }
    } catch(err) {
      console.log(err);
    }
    return null;
  }

}

export const userSessionService = new UserSessionService();