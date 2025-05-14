import axios from 'axios';

const API_URL = 'https://apizinder.up.railway.app';

// REGISTRAR NO SISTEMA
export const registerData = async(route: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}${route}`, data);
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// LOGAR NO SISTEMA
export const loginData = async(route: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}${route}`, data);
    return response;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};