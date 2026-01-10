
export type UserDtoType = UserDataType & { accessToken: string; }

export type UserDataType = {
    _id: string;
  email: string;
  username: string;
  phone?: string;
  isActivated: boolean;
  role: "Customer" | "Admin";

  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
}


export type LoginUserType = {
  email: string;
  password: string;
}

export type RegisterUserType = LoginUserType & {
  username: string;
  phone?: string;
}

export type JWTPayload = {
  exp: number;
  iat: number;
  sub: string; 
}