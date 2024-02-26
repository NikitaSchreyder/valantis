import md5 from "md5";
import axios, { AxiosInstance } from "axios";

import { 
  TValantisApiGetIdsProps, 
  TValantisApiGetItemsProps, 
  TValantisApiGetFieldsProps, 
  TValantisApiFilterProps 
} from "./valantis-api.types";

export class ValantisApi {
  private readonly API_AUTH: string
  private readonly axiosApi: AxiosInstance

  constructor() {
    const date = new Date().toLocaleString('ru', { dateStyle: 'short', timeZone: "Europe/Moscow" }).split('.').reverse().join().replaceAll(',', '')
    this.API_AUTH = md5(`Valantis_${date}`)
    
    this.axiosApi = axios.create({
      baseURL: 'http://api.valantis.store:40000/',
      headers: {
        'X-Auth': this.API_AUTH
      }
    })
  }

  async getIds(props: TValantisApiGetIdsProps) { 
    return await this.axiosApi.post('', { action: 'get_ids', params: props })
  }

  async getItems(props: TValantisApiGetItemsProps) {
    return await this.axiosApi.post('', { action: 'get_items', params: props })
  }

  async getFields(props: TValantisApiGetFieldsProps) {
    return await this.axiosApi.post('', { action: 'get_fields', params: props })
  }

  async filter(props: TValantisApiFilterProps) {
    return await this.axiosApi.post('', { action: 'filter', params: props })

  }
}