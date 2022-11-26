import api from '../services/api';

export interface UseFetchRequest {
  endPoint: string;
  method?: 'GET' | 'POST';
  body?: any;
}

export async function useFetch<T = any>({ endPoint, method, body }: UseFetchRequest): Promise<T> {
  const { data, status } = await api<T>({
    method,
    url: endPoint,
    data: body,
  });

  return {
    data,
    status,
  };
}

