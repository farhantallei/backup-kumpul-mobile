import axios, { AxiosRequestConfig } from 'axios';

interface FastifyError {
  statusCode: number;
  error: string;
  message: string;
}

const api = axios.create({ baseURL: 'http://192.168.1.100:5000/api/' });

export async function makeRequest<T = undefined>(
  url: string,
  options?: AxiosRequestConfig
) {
  try {
    const res = await api(url, options);
    return res.data as T;
  } catch (err) {
    if (!axios.isAxiosError(err) || !err.response)
      return Promise.reject('Error');
    return Promise.reject((err.response.data as FastifyError).message);
  }
}
