import {UserStatus} from '../enums/user-status.enum';

export interface User {
  data?: {
    user?: {
      id?: number,
      first_name?: string,
      last_name?: string,
      provider_id?: number,
      national_code?: string,
      mobile_number?: string,
      email?: string,
      status?: UserStatus,
      verified_at?: Date,
      remember_token?: string,
      created_at?: Date,
      roles?: any
    }
  },
  success?: boolean,
  message?: string
}
