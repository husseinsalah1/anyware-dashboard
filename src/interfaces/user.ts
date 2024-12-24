/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}
