export interface CitizenJwtPayload {
  id: number;
  phone: string;
  firebaseUid: string;
  /** Always 'citizen' — used to distinguish from staff JWT */
  type: 'citizen';
  iat?: number;
  exp?: number;
}
