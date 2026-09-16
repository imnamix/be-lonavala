export interface JwtPayload {
  id: number;
  email: string;
  role: string;
  phone?: string;
  permission?: string[];
  iat?: number;
  exp?: number;
}
