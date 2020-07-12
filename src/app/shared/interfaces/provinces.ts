import {Province} from './province';

export interface Provinces {
  data?: {
    provinces?: {
      current_page?: number,
      data?: Province['data']['province'][],
      first_page_url?: string,
      from?: number,
      last_page?: number,
      last_page_url?: string,
      per_page?: number,
      total?: number
    }
  }
}
