import axios, { AxiosResponse } from 'axios';

export type ApiData = Record<string, string | boolean | object>;

export async function get(endpoint: string, params?: ApiData): Promise<AxiosResponse> {
  const url = `${process.env.API_URL}${endpoint}`;
  return await axios.get(url, {
    params,
    validateStatus: () => {
      return true;
    }
  });
}

export async function post(endpoint: string, data: ApiData): Promise<AxiosResponse> {
  const url = `${process.env.API_URL}${endpoint}`;
  return await axios.post(url, data, {
    validateStatus: () => {
      return true;
    }
  });
}
