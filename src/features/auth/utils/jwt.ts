export interface JwtPayload {
  sub: string;
  authorities: string[];
  exp: number;
  iat: number;
  iss: string;
}

export const decodeToken = (token: string): JwtPayload => {
  const base64Payload = token.split(".")[1];
  const decodedPayload = atob(base64Payload);
  return JSON.parse(decodedPayload);
};
