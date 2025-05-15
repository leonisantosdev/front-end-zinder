import axios from 'axios';
import { API_URL } from '../config/urls.js';

export const getUserDatas = async (route: string, token: string) => {
  if(!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await axios.get(`${API_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response
}