export interface Province {
  success?: boolean,
  message?: string
  data?: {
    province?: {
      id?: number,
      title?: {
        en?: string,
        fa?: string
      },
      country_id?: number,
      created_at?: Date,
      updated_at?: Date
    }
  },


}
