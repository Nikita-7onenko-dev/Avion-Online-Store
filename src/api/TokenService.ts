import { JWTPayload } from "@/types/UserSessionTypes";
import { jwtDecode } from "jwt-decode";


class TokenService {

  private accessToken: string | null = null;

  setSession(token: string): number {
    this.accessToken = token;

    const payload = jwtDecode<JWTPayload>(this.accessToken);
    
    return payload.exp * 1000;
  }

  getToken() {
    return this.accessToken;
  }

  clear() {
    this.accessToken = null;
  }
}

export const tokenService = new TokenService();